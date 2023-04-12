// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

type Props = { children: React.ReactNode };

const ProtectedRoute: React.FC<Props> = (props) => {
  const { user } = useAppContext();

  // if no 'user' in the context => user will be kicked out to landing page
  if (!user) return <Navigate to="/landing" />;

  return <>{props.children}</>;
};

export default ProtectedRoute;
