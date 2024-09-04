import { NavigateFunction } from "react-router-dom";

export const handleSWRError = (navigate: NavigateFunction, error: any) => {
  if (error.status === 401) {
    navigate("/login");
  } else {
    console.error(error);
  }
};
