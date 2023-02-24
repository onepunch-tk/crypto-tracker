import {useLocation} from "react-router-dom";
import Header from "../components/Header";

function Coin() {
    const {state} = useLocation();
    return (
        <Header title={state?.coin.name??"Loading..."}/>
    );
}

export default Coin;