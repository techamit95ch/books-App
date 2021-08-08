import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./src/reducers";
import AsyncApp from "./src/AsyncApp";
import { LogBox } from "react-native";

export default function App() {
  // LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  return (
    <Provider store={store}>
      <AsyncApp />
    </Provider>
  );
}
