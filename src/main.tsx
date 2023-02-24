import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {GlobalStyle} from "./styles/reset-css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <GlobalStyle/>
        <App/>
    </>,
)
