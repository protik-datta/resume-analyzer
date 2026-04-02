import { useEffect, useState } from "react";
import { subscribe } from "../utils/toast";

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsub = subscribe((toast) => {
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    });

    return unsub;
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-lg shadow-md text-sm font-medium border ${
            t.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : t.type === "error"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default Toaster;
