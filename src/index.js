import React from "react";
import { useSelector } from "react-redux";

// import Routes from "./routes";
// import createRouter from "./routes";
import { Routes, RoutesDashboard } from "./routes";

export default function Index() {
  const signed = useSelector((state) => state.auth.signed);

  if (signed) {
    return <RoutesDashboard />;
  }
  // const Routes = createRouter(signed);

  return <Routes />;
}
