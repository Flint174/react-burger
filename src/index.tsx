import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './index.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { App } from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { ROOT_ELEMENT } from './utils/constants';

const root = ReactDOM.createRoot(
    ROOT_ELEMENT as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
