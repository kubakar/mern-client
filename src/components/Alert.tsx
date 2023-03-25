import React from "react";
import { useAppContext } from "../context/appContext";

type Props = {};

const Alert: React.FC<Props> = () => {
  const { alertText, alertType } = useAppContext();

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
