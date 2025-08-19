import { ERROR_MESSAGES, type ErrorType } from '../types/error';

export function handleApiError(
  err: unknown,
  setError: (error: ErrorType) => void,
  fallback: ErrorType = ERROR_MESSAGES.UnknownError
) {
  if (err instanceof Error) {
    setError(err.message as ErrorType);
  } else {
    setError(fallback);
  }
}
