import {createBrowserRouter} from "react-router-dom";
import Root from "./Root";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "",
                element: <Coins/>,

            },
            {
                path: "coins/:coinId",
                element: <Coin/>
            }
        ]
    }
]);
