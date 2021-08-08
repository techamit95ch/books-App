import React from "react";
import _ from 'lodash';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./src/reducers";
import AsyncApp from "./src/AsyncApp";
import Navigation from "./src/Navigation";
// import { LogBox } from "react-native";

export default function App() {
  // LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  // LogBox.ignoreLogs(['Setting a timer']);

  return (
    <Provider store={store}>
      {/* <AsyncApp /> */}
      <Navigation />
    </Provider>
  );
}
