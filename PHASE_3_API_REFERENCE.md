# Phase 3: Backend API Development - Complete Reference

## Overview

Phase 3 connects the Solana blockchain (Phase 2) to the PostgreSQL database, providing REST API endpoints and real-time WebSocket support for the frontend (Phase 4) and stream overlays (Phase 5).

**Architecture**:
```
Solana Program (Phase 2)
    ↓ (events)
Event Listener → PostgreSQL
    ↓
REST API Endpoints (Next.js)
    ↓
Frontend + WebSocket Clients
```

---

## Components Built

### 1. Event Listener (`src/lib/eventListener.ts`)

**Purpose**: Subscribe to Solana program events and sync to PostgreSQL

**How It Works**:
- Connects to Solana RPC endpoint
- Listens for `CreatorInitialized`, `TipSent`, `FeesWithdrawn` events
- Parses event logs from program
- Stores data in PostgreSQL via Prisma

**Key Functions**:
- `startEventListener()`: Begin listening to program events
- `handleCreatorInitialized()`: Sync creator profiles
- `handleTipSent()`: Store tip records
- `stopEventListener()`: Graceful shutdown

**Events Handled**:

**CreatorInitialized**
```json
{
  "creator": "Pubkey string",
  "username": "string",
  "timestamp": "i64"
}
```
→ Creates User in PostgreSQL

**TipSent**
```json
{
  "tipper": "Pubkey string",
  "creator": "Pubkey string",
  "amount": "u64 (lamports)",
  "creator_amount": "u64 (95%)",
  "platform_fee": "u64 (5%)",
  "timestamp": "i64"
}
```
→ Creates Tip record in PostgreSQL

---

### 2. REST API Endpoints

#### 2a. Get Creator Profile
**Endpoint**: `GET /api/creators/[username]`

**Request**:
```bash
curl "http://localhost:3000/api/creators/alice"
```

**Response**:
```json
{
  "user": {
    "id": "uuid",
    "username": "alice",
    "walletAddress": "ABC123...",
    "displayName": "Alice Creator",
    "isPremium": false,
    "createdAt": "2026-05-02T00:00:00Z",
    "tips": [
      {
        "id": "tip-uuid",
        "amount": "1000000000",
        "creatorAmount": "950000000",
        "platformFee": "50000000",
        "message": "Great stream!",
        "createdAt": "2026-05-02T00:05:00Z"
      }
    ]
  },
  "stats": {
    "totalTipsReceived": 950000000,
    "tipCount": 1,
    "isPremium": false
  }
}
```

**Status Codes**:
- `200`: Success
- `404`: Creator not found
- `500`: Server error

---

#### 2b. Get Tip History
**Endpoint**: `GET /api/tips/[username]?limit=20&offset=0`

**Request**:
```bash
curl "http://localhost:3000/api/tips/alice?limit=10&offset=0"
```

**Response**:
```json
{
  "tips": [
    {
      "id": "tip-uuid",
      "tipper": "XYZ789...",
      "amount": "500000000",
      "message": "Love your content",
      "createdAt": "2026-05-02T00:05:00Z"
    }
  ],
  "count": 1,
  "limit": 10,
  "offset": 0
}
```

**Query Parameters**:
- `limit`: Results per page (max 100, default 20)
- `offset`: Pagination offset (default 0)

---

#### 2c. Send Tip
**Endpoint**: `POST /api/tips/send`

**Request**:
```json
{
  "recipientUsername": "alice",
  "amountSol": 1.5,
  "message": "Great stream!",
  "donorName": "Bob",
  "donorWalletAddress": "ABC123..."
}
```

**Response**:
```json
{
  "success": true,
  "tip": {
    "id": "tip-uuid",
    "recipientId": "user-uuid",
    "amount": "1500000000",
    "message": "Great stream!",
    "confirmationStatus": "pending"
  },
  "message": "Tip recorded. Awaiting blockchain confirmation."
}
```

**Validation**:
- recipientUsername must exist
- amountSol > 0
- message ≤ 500 characters

**Status Codes**:
- `201`: Created
- `400`: Bad request
- `404`: Recipient not found

---

#### 2d. Generate Auth Nonce
**Endpoint**: `POST /api/auth/nonce`

**Request**:
```json
{
  "walletAddress": "ABC123..."
}
```

**Response**:
```json
{
  "nonce": "random-string-123",
  "message": "Sign this message to prove you own ABC123...: random-string-123"
}
```

**Purpose**: Create a challenge for wallet signature verification

---

#### 2e. Verify Wallet Signature
**Endpoint**: `POST /api/auth/verify`

**Request**:
```json
{
  "walletAddress": "ABC123...",
  "message": "Sign this message to prove you own ABC123...: random-string-123",
  "signature": "sig_base58_string"
}
```

**Response**:
```json
{
  "user": {
    "id": "user-uuid",
    "walletAddress": "ABC123...",
    "username": "ABC123...",
    "createdAt": "2026-05-02T00:00:00Z"
  },
  "authenticated": true
}
```

**How It Works**:
1. Frontend calls `POST /api/auth/nonce` to get a nonce
2. Frontend asks wallet to sign the message (Phantom/Solflare dialog)
3. Frontend sends signature to `POST /api/auth/verify`
4. Backend verifies signature using Ed25519 crypto
5. User is authenticated

---

#### 2f. Get Platform Stats
**Endpoint**: `GET /api/stats`

**Response**:
```json
{
  "id": "stats-uuid",
  "date": "2026-05-02",
  "totalTipsCount": 150,
  "totalVolumeSol": "50.5",
  "platformFeeCollected": "2.525",
  "uniqueDonors": 45,
  "uniqueCreators": 12,
  "activeUsers": 57,
  "premiumUsersCount": 3
}
```

---

### 3. WebSocket Server (`src/lib/websocketServer.ts`)

**Purpose**: Real-time push notifications for stream overlays

**How It Works**:
1. Stream overlay connects: `ws://localhost:3000`
2. Client sends: `{ "type": "subscribe", "creatorId": "alice-pubkey" }`
3. When tip arrives, server broadcasts: `{ "type": "tip", "data": {...} }`

**Messages**:

**Subscribe**:
```json
{
  "type": "subscribe",
  "creatorId": "ABC123..."
}
```

**Response**:
```json
{
  "type": "subscribed",
  "creatorId": "ABC123...",
  "message": "Subscribed to tips for creator ABC123..."
}
```

**Tip Broadcast** (from server):
```json
{
  "type": "tip",
  "creatorId": "ABC123...",
  "data": {
    "tipper": "XYZ789...",
    "amount": "1000000000",
    "message": "Great stream!"
  },
  "timestamp": "2026-05-02T00:05:00Z"
}
```

**Error**:
```json
{
  "type": "error",
  "message": "Error description"
}
```

---

## Database Schema (Prisma)

All data flows through these tables:

```
User
├─ id (UUID, PK)
├─ username (String, unique)
├─ walletAddress (String, unique)
├─ displayName (String?)
├─ isPremium (Boolean, default: false)
├─ createdAt (DateTime)
└─ tips[] (Relation: Tip[])

Tip
├─ id (UUID, PK)
├─ tipper (String, Pubkey)
├─ recipientId (UUID, FK → User.id)
├─ amount (Decimal, u64 lamports)
├─ platformFee (Decimal, 5%)
├─ creatorAmount (Decimal, 95%)
├─ message (String, ≤500 chars)
├─ transactionHash (String, unique)
├─ confirmationStatus (enum: pending|confirmed|finalized)
├─ createdAt (DateTime)
└─ updatedAt (DateTime)

PlatformStats
├─ id (UUID, PK)
├─ date (Date, unique)
├─ totalTipsCount (Int)
├─ totalVolumeSol (Decimal)
├─ platformFeeCollected (Decimal)
├─ uniqueDonors (Int)
├─ uniqueCreators (Int)
├─ activeUsers (Int)
└─ premiumUsersCount (Int)
```

---

## Workflow: User Tips a Creator

```
1. Frontend loads creator page
   → GET /api/creators/alice

2. User enters amount & message
   → POST /api/tips/send
   → Backend creates Tip record (status: pending)
   → Returns transaction info

3. Frontend constructs Solana transaction
   → Calls Solana program with send_tip instruction
   → User signs with wallet

4. Transaction submitted to blockchain
   → Solana validators confirm
   → Event emitted: TipSent

5. Event Listener catches event
   → Parses TipSent event
   → Updates Tip record status to "confirmed"

6. WebSocket broadcasts to stream overlay
   → Creator sees pop-up notification in OBS

7. User can view tip in history
   → GET /api/tips/alice
   → Sees their tip in the list
```

---

## Authentication Flow

```
1. User clicks "Sign In"
   → Frontend calls POST /api/auth/nonce

2. Backend returns nonce
   → "Sign this message to prove ownership: abc123"

3. Frontend asks wallet to sign
   → Phantom/Solflare shows signing dialog
   → User approves

4. Frontend sends to POST /api/auth/verify
   → { walletAddress, message, signature }

5. Backend verifies signature
   → Uses Ed25519 to confirm wallet signed it
   → Checks signature matches public key

6. If valid:
   → Create/update User in DB
   → Return authenticated: true
   → Frontend stores session

7. If invalid:
   → Return 401 Unauthorized
```

---

## Error Handling

All endpoints follow this pattern:

**Success**:
```json
{
  "status": 200,
  "data": {...}
}
```

**Client Error** (4xx):
```json
{
  "status": 400,
  "error": "Username required"
}
```

**Server Error** (5xx):
```json
{
  "status": 500,
  "error": "Internal server error"
}
```

---

## Performance Optimizations

1. **Event Batching**: Process events in batches for faster DB writes
2. **Caching**: Cache popular creator profiles (Redis in production)
3. **Pagination**: API endpoints always paginate tip history
4. **Indexing**: Database indexes on walletAddress, username, createdAt
5. **Connection Pooling**: Prisma handles DB connection pooling

---

## Security Considerations

1. **Signature Verification**: All authentication through wallet signatures
2. **Rate Limiting**: (To implement in production) Prevent spam
3. **Input Validation**: All inputs validated before processing
4. **SQL Injection**: Prisma ORM prevents SQL injection
5. **HTTPS**: All endpoints should be HTTPS in production

---

## Configuration

**Environment Variables**:
```bash
# Solana
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=ABC123...

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/pufftip

# Server
NEXT_PUBLIC_API_URL=http://localhost:3000
WS_PORT=3001
```

---

## Testing Phase 3

### 1. Test Creator Profile Endpoint
```bash
curl "http://localhost:3000/api/creators/alice"
```

### 2. Test Auth Flow
```bash
# Get nonce
curl -X POST http://localhost:3000/api/auth/nonce \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"ABC123..."}'

# Verify signature
curl -X POST http://localhost:3000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress":"ABC123...",
    "message":"...",
    "signature":"..."
  }'
```

### 3. Test Tip Submission
```bash
curl -X POST http://localhost:3000/api/tips/send \
  -H "Content-Type: application/json" \
  -d '{
    "recipientUsername":"alice",
    "amountSol":1.5,
    "message":"Great stream!",
    "donorName":"Bob"
  }'
```

### 4. Test WebSocket
```javascript
const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    creatorId: 'alice-pubkey'
  }));
};
ws.onmessage = (event) => {
  console.log('Message:', JSON.parse(event.data));
};
```

---

## Next Steps: Phase 4

Phase 4 will use these APIs:
- Landing page: `GET /api/stats`
- Tip form: `POST /api/tips/send` + `POST /api/tips/[username]`
- Creator page: `GET /api/creators/[username]`
- Auth: `POST /api/auth/nonce` + `POST /api/auth/verify`
- Stream overlay: WebSocket connection

---

Generated: Phase 3 Backend API Development
