import { CheckCircle, AlertCircle, X } from "lucide-react";

function Toast({ message, type, onClose }) {
  const success = type === "success";

  return (
    <div className={`toast ${success ? "toast-success" : "toast-error"}`}>
      {success ? (
        <CheckCircle size={19} />
      ) : (
        <AlertCircle size={19} />
      )}

      <span>{message}</span>

      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;