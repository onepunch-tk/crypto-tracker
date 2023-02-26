import {Link, Outlet, useMatch, useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {ICoinDetail, ICoinPrice} from "../../utils/coin-module";
import styled from "styled-components";
import {useQuery} from "react-query";
import {fetchCoinDetail, fetchPrice} from "../../controllers/apis/coin-api";
import Chart from "../components/Chart";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 20px;
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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;


function Coin() {
    const {coinId} = useParams();
    const chartPathMatch = useMatch(":coinId/chart");
    const pricePathMatch = useMatch(":coinId/price");

    //delete
    //const {state} = useLocation();
    // const navigate = useNavigate();
    // const [detail, setDetail] = useState<ICoinDetail>();
    // const [price, setPrice] = useState<ICoinPrice>();
    //
    // useEffect(() => {
    //     (async () => {
    //         // if (!state) {
    //         //     return navigate("/");
    //         // }
    //         const detailResult = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         setDetail(detailResult);
    //         const priceResult = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setPrice(priceResult);
    //     })();
    // }, []);

    //use react-query
    const {data:detail} = useQuery<ICoinDetail>(["coins","detail",coinId], ()=>fetchCoinDetail(coinId as string));
    const {data:price} = useQuery<ICoinPrice>(["coins","price",coinId], ()=>fetchPrice(coinId as string));
    return (
        <>
            <Header title={detail?.name as string}/>
            <Link to={"/"}>Back Coins View &larr;</Link>
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
            <Tabs>
                <Tab isActive={chartPathMatch !== null}>
                    <Link to={"chart"}>Chart</Link>
                </Tab>
                <Tab isActive={pricePathMatch !== null}>
                    <Link to={"price"}>Price</Link>
                </Tab>
            </Tabs>
            <Outlet context={coinId}/>
        </>
    );
}

export default Coin;