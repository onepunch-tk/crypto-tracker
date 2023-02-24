import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {GlobalStyle} from "./styles/reset-css";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </>,
)
