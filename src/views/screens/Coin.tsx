import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {ICoinDetail, ICoinPrice} from "../../utils/coin-module";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

function Coin() {
    //delete
    //const {state} = useLocation();
    const {coinId} = useParams();
    const [detail, setDetail] = useState<ICoinDetail>();
    const [price, setPrice] = useState<ICoinPrice>();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            // if (!state) {
            //     return navigate("/");
            // }
            const detailResult = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            setDetail(detailResult);
            const priceResult = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setPrice(priceResult);
        })();
    }, []);
    return (
        <>
            <Header title={detail?.name as string}/>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{detail?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${detail?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Open Source:</span>
                    <span>{detail?.open_source ? "Yes" : "No"}</span>
                </OverviewItem>
            </Overview>
            <Description>{detail?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Supply:</span>
                    <span>{price?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{price?.max_supply}</span>
                </OverviewItem>
            </Overview>
            <Link to={"chart"}>Chart</Link>
            <Link to={"price"}>Price</Link>
            <Outlet />
        </>
    );
}

export default Coin;