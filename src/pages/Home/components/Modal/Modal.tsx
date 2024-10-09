import React from "react";

interface ModalProps {
  videoKey: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ videoKey, onClose }) => {
  if (!videoKey) return null; 

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/40 py-16 md:py-64 lg:py-16 z-[60]">
      <div className="relative max-w-screen-md bg-black-main h-full z-50 mx-auto p-8">
        <iframe
          allowFullScreen={true}
          src={`https://www.youtube.com/embed/${videoKey}`}
          className="w-full h-full"
        ></iframe>
        <svg
          onClick={onClose}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="absolute top-2 right-2 text-xl text-white cursor-pointer hover:text-red-main"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Modal;
