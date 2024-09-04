import { useContext, useState } from "react";
import { createContext } from "react";
import { Props as ToastProps } from "@/src/components/Toast";

interface Props {
  children: React.ReactNode;
}

type ToastContextType = [
  ToastProps[],
  React.Dispatch<React.SetStateAction<ToastProps[]>>
];

const ToastContext = createContext<ToastContextType>([[], () => []]);

const ToastProvider = ({ children }: Props) => {
  const [state, setState] = useState<ToastProps[]>([]);
  return (
    <ToastContext.Provider
      {...{
        children,
        value: [state, setState],
      }}
    />
  );
};

const ToastConsumer = ToastContext.Consumer;

const useToast = () => useContext(ToastContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useToast, ToastProvider, ToastConsumer };
