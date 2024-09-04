import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Routes from "./routes";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { SWRConfig } from "swr";
import { handleSWRError } from "./api/401.helper";

const App = () => {
  const navigate = useNavigate();
  return (
    <Suspense>
      <SWRConfig
        value={{
          onError: (error) => handleSWRError(navigate, error),
        }}
      >
        <Routes />
      </SWRConfig>
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
