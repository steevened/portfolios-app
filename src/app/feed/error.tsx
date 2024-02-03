"use client";

import ErrorMessage from "@/components/atoms/error-message";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: number };
  reset: () => void;
}) {
  return <ErrorMessage reset={() => reset()} error={error} />;
}
