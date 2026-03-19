export function Loading({ text = 'Hleð gögnum...' }: { text?: string }) {
  return <p className="status-message">{text}</p>;
}
