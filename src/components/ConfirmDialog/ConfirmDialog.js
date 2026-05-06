import { useEffect, useRef } from 'react';

const ConfirmDialog = ({
  open,
  title,
  message,
  cancelLabel = '取消',
  confirmLabel = '确认',
  onCancel,
  onConfirm,
}) => {
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    confirmButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="confirm-dialog-backdrop"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
      >
        <h2 id="confirm-dialog-title" className="confirm-dialog-title">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="confirm-dialog-message">
          {message}
        </p>
        <div className="confirm-dialog-actions">
          <button type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmButtonRef}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
