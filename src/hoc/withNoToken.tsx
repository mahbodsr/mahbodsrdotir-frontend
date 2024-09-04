import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withNoToken = <P extends object>(LazyComponent: ComponentType<P>) => {
  return (props: P) => {
    const navigate = useNavigate();

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    useEffect(() => {
      if (token) {
        navigate("/");
      }
    }, [navigate, token]);

    if (token) {
      return null; // or you could return a loading spinner here
    }

    return <LazyComponent {...props} />;
  };
};

export default withNoToken;
