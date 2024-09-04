import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withToken = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const navigate = useNavigate();

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [navigate, token]);

    if (!token) {
      return null; // or you could return a loading spinner here
    }

    return <WrappedComponent {...props} />;
  };
};

export default withToken;
