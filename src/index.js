import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "@fortawesome/fontawesome-free/css/all.min.css";

import UserContextProvider from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const query = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={query}>
    <UserContextProvider>
      <App />
    </UserContextProvider>

    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
  </QueryClientProvider>
);
