import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IProps {
  children: React.ReactNode;
}

const ToastPortal = ({ children }: IProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(children, document.getElementById("toast")!)
    : null;
};

export default ToastPortal;
