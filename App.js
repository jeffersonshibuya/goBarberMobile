import React from "react";

import "./src/config/ReactotronConfig";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import Routes from "./src/routes";

import { store, persistor } from "./src/store";

export default function App() {
  return (
    // <Routes />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
    //     <Routes />
    //   </PersistGate>
    // </Provider>
  );
}
