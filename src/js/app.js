import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import store from "./store";
import Layout from "./components/Layout";
import { initMapConfiguration } from "./config";


initMapConfiguration();

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('app'));
