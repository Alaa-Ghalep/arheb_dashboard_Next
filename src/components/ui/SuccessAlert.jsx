import '@/styles/alert.css';

export default function SuccessAlert({ show, isExiting, message, subMessage, onClose }) {
  if (!show) return null;

  return (
    <div className={`success-alert ${isExiting ? 'alert-exit' : 'alert-enter'}`}>
      <div className="success-alert-icon">
        <span>✓</span>
      </div>
      <div className="flex-1">
        <p className="success-alert-title">{message}</p>
        <p className="success-alert-sub">{subMessage}</p>
      </div>
      <button onClick={onClose} className="success-alert-close">×</button>
    </div>
  );
}