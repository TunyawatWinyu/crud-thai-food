import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./Page/Home/Home";
import EditDrawer from "./Components/EditDrawer/EditDrawer";
import CategoryProvider from "./Context/CategoryContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "edit",
        element: <EditDrawer />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <RouterProvider router={router} />
    </CategoryProvider>
  </React.StrictMode>,
);
