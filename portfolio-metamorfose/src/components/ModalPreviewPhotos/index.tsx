// ModalPreviewPhotos.tsx
"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Aseguramos que document exista (Next/SSR)
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[9999]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista previa de imagen"
    >
      <div
        className="rounded-lg shadow-md max-w-[100vw] max-h-[100vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
