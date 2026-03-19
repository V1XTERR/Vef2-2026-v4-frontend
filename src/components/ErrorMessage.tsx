export function ErrorMessage({ message }: { message: string }) {
  return <p className="status-message error-message">{message}</p>;
}
