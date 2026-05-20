/**
 * TipForm Component
 *
 * Reusable form for sending tips to a creator.
 *
 * Features:
 * - Preset amount buttons (0.1, 0.5, 1, 5 SOL) for quick selection
 * - Custom amount input with validation
 * - Optional donor name and message
 * - Loading state with disabled inputs
 * - Error display with styled alerts
 * - Success callback for parent components
 *
 * Validation:
 * - Amount: 0.01 to 1000 SOL, must be a valid number
 * - Message: max 500 characters
 *
 * Tech: Sends POST /api/tips/send → createTip() in apiHelpers.ts
 */

import { Box, Button, Input, Textarea, VStack, Text, HStack } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface TipFormProps {
  username: string;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

interface FormData {
  donorName: string;
  amount: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

/** Preset tip amounts for quick selection */
const PRESET_AMOUNTS = [
  { label: "0.1", value: "0.1" },
  { label: "0.5", value: "0.5" },
  { label: "1", value: "1" },
  { label: "5", value: "5" },
];

export function TipForm({ username, onSuccess, onError }: TipFormProps) {
  const [formData, setFormData] = useState<FormData>({
    donorName: "",
    amount: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  /**
   * Validates form input before submission
   * Returns array of validation errors (empty if valid)
   */
  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount)) {
      errors.push({ field: "amount", message: "Amount is required" });
    } else if (amount < 0.01) {
      errors.push({ field: "amount", message: "Minimum tip is 0.01 SOL" });
    } else if (amount > 1000) {
      errors.push({ field: "amount", message: "Maximum tip is 1000 SOL" });
    }

    if (formData.message.length > 500) {
      errors.push({ field: "message", message: "Message must be under 500 characters" });
    }

    return errors;
  };

  /**
   * Handles form submission
   * Validates input, sends tip via API, handles response
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors([]);

    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      if (onError) onError("Please fix the errors above");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/tips/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientUsername: username,
          amountSol: parseFloat(formData.amount),
          message: formData.message || "Thanks for the great content!",
          donorName: formData.donorName || "Anonymous",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || "Failed to send tip");
      }

      // Reset form on success
      setFormData({ donorName: "", amount: "", message: "" });
      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return validationErrors.find((e) => e.field === field)?.message;
  };

  return (
    <MotionBox
      as="form"
      onSubmit={handleSubmit}
      w="full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <VStack gap={5} align="stretch">
        {/* Error Alert */}
        {error && (
          <Box
            p={3}
            borderRadius="md"
            bg="brand.markerRed"
            border="2px solid"
            borderColor="brand.ink"
            display="flex"
            alignItems="flex-start"
            gap={2}
          >
            <FiAlertCircle style={{ marginTop: "2px", color: "var(--theme-bg)", flexShrink: 0 }} />
            <Text fontSize="sm" color="brand.paper" fontFamily="body" fontWeight="bold">{error}</Text>
          </Box>
        )}

        {/* Donor Name */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="sm" color="brand.ink" fontFamily="body">
            Your Name
          </Text>
          <Input
            placeholder="Leave blank to stay anonymous"
            value={formData.donorName}
            onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
            disabled={loading}
            maxLength={100}
            size="lg"
          />
        </Box>

        {/* Tip Amount with Presets */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="sm" color="brand.ink" fontFamily="body">
            Tip Amount (SOL) <span style={{ color: "var(--theme-marker-red)" }}>*</span>
          </Text>

          {/* Preset Buttons */}
          <HStack gap={2} mb={3}>
            {PRESET_AMOUNTS.map((preset) => (
              <Button
                key={preset.value}
                size="sm"
                flex={1}
                variant={formData.amount === preset.value ? "solid" : "outline"}
                bg={formData.amount === preset.value ? "brand.markerYellow" : "transparent"}
                color="brand.ink"
                border="2px solid"
                borderColor={formData.amount === preset.value ? "brand.ink" : "brand.inkSoft"}
                _hover={{
                  bg: "brand.markerYellow",
                  borderColor: "brand.ink",
                  transform: "rotate(var(--theme-rot-1))"
                }}
                borderRadius="md"
                onClick={() => setFormData({ ...formData, amount: preset.value })}
                disabled={loading}
                fontWeight="bold"
                fontFamily="body"
              >
                ◎ {preset.label}
              </Button>
            ))}
          </HStack>

          {/* Custom Amount Input */}
          <Input
            type="number"
            placeholder="Or enter custom amount"
            step="0.01"
            min="0.01"
            max="1000"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            disabled={loading}
            size="lg"
          />
          <Text fontSize="xs" color="brand.inkSoft" mt={1} fontFamily="body">
            Between 0.01 and 1000 SOL • 98% goes to creator
          </Text>
          {getFieldError("amount") && (
            <Text color="brand.markerRed" fontSize="xs" mt={1} fontWeight="bold">
              {getFieldError("amount")}
            </Text>
          )}
        </Box>

        {/* Message */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="sm" color="brand.ink" fontFamily="body">
            Message
          </Text>
          <Textarea
            placeholder="Write a message (optional, max 500 chars)"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={loading}
            maxLength={500}
            rows={3}
          />
          <Text fontSize="xs" color="brand.inkSoft" mt={1} fontFamily="body">
            {formData.message.length}/500
          </Text>
          {getFieldError("message") && (
            <Text color="brand.markerRed" fontSize="xs" mt={1} fontWeight="bold">
              {getFieldError("message")}
            </Text>
          )}
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          bg="brand.ink"
          color="brand.paper"
          _hover={{ transform: "rotate(var(--theme-rot-1))" }}
          transition="all 0.2s"
          borderRadius="md"
          loading={loading}
          w="full"
          className="shadow-sticker"
          fontFamily="heading"
          fontSize="2xl"
        >
          <HStack gap={2}>
            <Text>{loading ? "sending..." : "send a puff →"}</Text>
          </HStack>
        </Button>
      </VStack>
    </MotionBox>
  );
}
