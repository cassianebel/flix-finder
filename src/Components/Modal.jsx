import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 backdrop-blur-md bg-opacity-25"
    >
      <div className="bg-zinc-950 px-3 pb-6 rounded-lg shadow-lg w-5/6 xl:w-2/3 max-h-screen overflow-scroll">
        <div className="flex justify-end">
          <button className="text-3xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
