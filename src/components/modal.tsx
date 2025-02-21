"use client";

import { useModal } from "@/store/modal";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5"; // Import close icon

interface Props {
  onClickOutsideClose?: boolean;
}

const Modal = ({ onClickOutsideClose = true }: Props) => {
  const { opened, content, closeContent } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        opened &&
        onClickOutsideClose &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeContent();
      }
    };

    if (opened) {
      document.addEventListener("mousedown", handleClickOutside); // Use mousedown for better click detection
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened, onClickOutsideClose, closeContent]);

  if (!opened) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {" "}
      {/* Overlay */}
      <div
        className="bg-white rounded-lg p-6 shadow-md relative"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeContent}
        >
          <IoClose size={20} />
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
