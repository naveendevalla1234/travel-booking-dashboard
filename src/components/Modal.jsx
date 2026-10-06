import { X } from "lucide-react";

function Modal({
  title,
  children,
  onClose,
  onSubmit,
  submitText = "Save",
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="modal-body">
            {children}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="primary-btn">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;