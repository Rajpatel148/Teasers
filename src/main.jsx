import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import VideoPopUpContextProvider from "./Context/VideoPopUp.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VideoPopUpContextProvider>
      <App />
    </VideoPopUpContextProvider>
  </StrictMode>
);
