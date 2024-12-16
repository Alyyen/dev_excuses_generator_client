import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-800 bg-opacity-50 z-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6 relative">
          {/* Modal Header */}
          {title && (
            <div className="text-lg font-semibold mb-4 text-slate-800">
              <h3>{title}</h3>
            </div>
          )}

          {/* Modal Body */}
          <div className="mb-4">{children}</div>

          {/* Modal Footer */}
          <div className="flex justify-end">
            <button
              className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
