export function SourceNotice({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  if (!message) return <span className="stitch-sr-only" role="status" />;
  return (
    <div className="stitch-feedback" role="status">
      <span>{message}</span>
      <button type="button" onClick={onDismiss} aria-label="关闭提示">
        ×
      </button>
    </div>
  );
}
