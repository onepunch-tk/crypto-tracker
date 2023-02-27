import {Link, Outlet} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {ICoin} from "../../utils/coin-module";
import Header from "../components/Header";
import {useQuery} from "react-query";
import {fetchCoins} from "../../controllers/apis/coin-api";
import {Helmet} from "react-helmet";



const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
    align-items: center;
  }

  &:hover {
    color: ${props => props.theme.accentColor};
  }
`;

const CoinIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`

const Loader = styled.span`
  display: block;
  text-align: center;
`

function Coins() {
    // const [coins, setCoins] = useState<ICoin[]>();
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const response = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
    //         setCoins(response.slice(0, 100));
    //         setIsLoading(false);
    //     })();
    // }, []);

    //use react-query
    const {isLoading, data} = useQuery<ICoin[]>(["coins"],fetchCoins);

    return (
        <>
            <Helmet>
                <title>
                    {`Crypto Tracker - Home`}
                </title>
            </Helmet>
            <Header title={"Coins"}/>
            <CoinList>
                {isLoading ? (<Loader>Loading...</Loader>) :
                    (data?.map(coin =>
                            <Coin key={coin.id}>
                                <Link
                                    to={`/${coin.id}`}
                                    state={{coin}}
                                >
                                    <CoinIcon src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        )
                    )
                }
            </CoinList>
        </>
    );
}

export default Coins;