import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import "@ya.praktikum/react-developer-burger-ui-components";
import { App } from "./components/app";
import reportWebVitals from "./report-web-vitals";
import { ROOT_ELEMENT } from "./utils/constants";
import { Provider } from "react-redux";
import { store } from "./services";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(ROOT_ELEMENT as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <App />
        </Provider>
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
