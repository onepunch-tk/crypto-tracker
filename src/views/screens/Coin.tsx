import {useLocation, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {ICoinDetail, ICoinPrice} from "../../utils/coin-module";

function Coin() {
    const {state} = useLocation();
    const [detail, setDetail] = useState<ICoinDetail>();
    const [price, setPrice] = useState<ICoinPrice>();
    const navigate = useNavigate();

    useEffect(()=>{
        (async () =>{
            if(!state) {
                return navigate("/");
            }
            const detailResult = await (await fetch(`https://api.coinpaprika.com/v1/coins/${state.coin.id}`)).json();
            setDetail(detailResult);
            const priceResult = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${state.coin.id}`)).json();
            setPrice(priceResult);
        })();
    },[]);
    return (
        <Header title={state?.coin.name??"Loading..."}/>
    );
}

export default Coin;