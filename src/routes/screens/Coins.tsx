import {Link, Outlet} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {ICoin} from "../../utils/coin-module";
import Header from "../components/Header";



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
    const [coins, setCoins] = useState<ICoin[]>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const result = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
            setCoins(result.slice(0, 100));
            setIsLoading(false);
        })();
    }, []);
    return (
        <>
            <Header title={"Coins"}/>
            <CoinList>
                {isLoading ? (<Loader>Loading...</Loader>) :
                    (coins?.map(coin =>
                            <Coin key={coin.id}>
                                <Link
                                    to={`/coins/${coin.id}`}
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