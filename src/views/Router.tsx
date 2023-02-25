import {createBrowserRouter, Navigate} from "react-router-dom";
import Root from "./Root";
import Coins from "./screens/Coins";
import Coin from "./screens/Coin";
import Chart from "./components/Chart";
import Price from "./components/Price";

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
                element: <Coin/>,
                children: [
                    {
                        index:true,
                        element: <Navigate to={"chart"}/>
                    },
                    {
                        path: "chart",
                        element: <Chart/>
                    },
                    {
                        path: "price",
                        element: <Price/>
                    }
                ],
            }
        ]
    }
]);
