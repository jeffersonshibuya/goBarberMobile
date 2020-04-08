import React from "react";

import "./src/config/ReactotronConfig";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import Index from "./src";

import { store, persistor } from "./src/store";

export default function App() {
  return (
    // <Routes />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
    //     <Routes />
    //   </PersistGate>
    // </Provider>
  );
}
