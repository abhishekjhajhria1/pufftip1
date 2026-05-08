/**
 * TipForm Component
 * 
 * Reusable component for sending tips to a creator.
 * Handles form validation, error handling, and loading states.
 * 
 * Features:
 * - Input validation (amount > 0, message length limits)
 * - Error messages displayed to user
 * - Loading state management
 * - Success callback for parent components
 * - Tip amount range: 0.01 SOL to 1000 SOL
 */

import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Text,
  Alert,
} from "@chakra-ui/react";
import { FiCheck, FiAlertCircle } from "react-icons/fi";
import { useState } from "react";

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

    // Validate amount
    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount)) {
      errors.push({ field: "amount", message: "Amount is required" });
    } else if (amount < 0.01) {
      errors.push({ field: "amount", message: "Minimum tip is 0.01 SOL" });
    } else if (amount > 1000) {
      errors.push({ field: "amount", message: "Maximum tip is 1000 SOL" });
    }

    // Validate message length
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

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      if (onError) {
        onError("Please fix the errors above");
      }
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/tips/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientUsername: username,
          amountSol: parseFloat(formData.amount),
          message: formData.message || "Thanks for the great content!",
          donorName: formData.donorName || "Anonymous",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send tip");
      }

      // Reset form on success
      setFormData({ donorName: "", amount: "", message: "" });
      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get field-specific errors
  const getFieldError = (field: string): string | undefined => {
    return validationErrors.find((e) => e.field === field)?.message;
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="full">
      <VStack gap={4} align="stretch">
        {/* Error Alert */}
        {error && (
          <Box 
            p={3} 
            borderRadius="md" 
            bg="red.50" 
            borderLeft="4px solid #cb2431"
            display="flex" 
            alignItems="flex-start"
            gap={2}
          >
            <FiAlertCircle style={{ marginTop: "2px", color: "#cb2431", flexShrink: 0 }} />
            <Text fontSize="sm">{error}</Text>
          </Box>
        )}

        {/* Donor Name Field */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="sm">
            Your Name (Optional)
          </Text>
          <Input
            placeholder="Leave blank to stay anonymous"
            value={formData.donorName}
            onChange={(e) =>
              setFormData({ ...formData, donorName: e.target.value })
            }
            disabled={loading}
            maxLength={100}
          />
          <Text fontSize="xs" color="gray.500" mt={1}>
            Or we&apos;ll show you as &quot;Anonymous&quot;
          </Text>
        </Box>

        {/* Amount Field */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="sm">
            Tip Amount (SOL) <span style={{ color: "red" }}>*</span>
          </Text>
          <Input
            type="number"
            placeholder="0.10"
            step="0.01"
            min="0.01"
            max="1000"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            disabled={loading}
          />
          <Text fontSize="xs" color="gray.500" mt={1}>
            Between 0.01 and 1000 SOL
          </Text>
          {getFieldError("amount") && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {getFieldError("amount")}
            </Text>
          )}
        </Box>

        {/* Message Field */}
        <Box>
          <Text fontWeight="bold" mb={2} fontSize="sm">
            Message (Optional)
          </Text>
          <Textarea
            placeholder="Write a message (max 500 characters)"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            disabled={loading}
            maxLength={500}
            rows={4}
          />
          <Text fontSize="xs" color="gray.500" mt={1}>
            {formData.message.length}/500 characters
          </Text>
          {getFieldError("message") && (
            <Text color="red.500" fontSize="xs" mt={1}>
              {getFieldError("message")}
            </Text>
          )}
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          colorScheme="purple"
          size="lg"
          loading={loading}
          w="full"
        >
          {loading ? "Sending..." : "Send Tip"}
        </Button>
      </VStack>
    </Box>
  );
}
