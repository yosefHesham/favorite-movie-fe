import React, { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white ${bgColor}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-4 text-white hover:text-gray-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
