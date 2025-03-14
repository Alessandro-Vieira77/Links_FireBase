import { RouterProvider } from "react-router-dom";
import { router } from "../src/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
