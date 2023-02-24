import React from 'react'
import ReactDOM from 'react-dom/client'
import {GlobalStyle} from "./styles/reset-css";
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";
import {RouterProvider} from 'react-router-dom';
import {router} from "./routes/Router";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </>
)
