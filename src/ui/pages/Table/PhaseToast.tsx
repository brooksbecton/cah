import * as React from "react";
import { ToastContainer, toast } from "react-toastify";

export interface IProps {
  phase: string;
}

export const PhaseToast: React.FC<IProps> = ({ phase }) => {
  const containerId = "phase";

  React.useEffect(() => {
    toast(`New Phase!  ${phase.toUpperCase()}`, { containerId });
  }, [phase]);

  return <ToastContainer enableMultiContainer containerId={containerId} />;
};
