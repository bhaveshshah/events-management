import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Button } from "../Button/Button.jsx";

const MODAL_SIZE = ["sm", "md", "lg"];

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showFooter = true,
  footerContent,
  className = "",
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus management: focus modal when opened
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalSizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  const modalContent = (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={`modal-container bg-[#2d2d2d] rounded-lg shadow-xl w-full ${modalSizeClasses[size]} ${className}`}
      >
        <div className="modal-header flex items-center justify-between p-4 border-b">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body p-4">{children}</div>

        {showFooter && (
          <div className="modal-footer flex justify-end gap-2 p-4 border-t">
            {footerContent || <Button onClick={onClose}>Close</Button>}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(MODAL_SIZE),
  showFooter: PropTypes.bool,
  footerContent: PropTypes.node,
  className: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
};
