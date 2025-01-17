import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: "linear-gradient(to right, rgb(15, 23, 42), rgb(23, 26, 46))",
    color: "#e2e8f0",
    borderRadius: "0.75rem",
    border: "1px solid rgba(99, 102, 241, 0.1)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }
};

const successStyle = {
  ...toastConfig,
  icon: "🎉",
  style: {
    ...toastConfig.style,
    borderLeft: "4px solid rgb(129, 140, 248)",
  }
};

const errorStyle = {
  ...toastConfig,
  icon: "⚠️",
  style: {
    ...toastConfig.style,
    borderLeft: "4px solid rgb(239, 68, 68)",
  }
};

export const handleSuccess = (msg) => {
  toast.success(msg, successStyle);
};

export const handleError = (msg) => {
  toast.error(msg, errorStyle);
};

