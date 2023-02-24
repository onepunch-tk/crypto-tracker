import {Link, Outlet} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

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
        <Container>
            <Header>
                <Title>coins</Title>
            </Header>
            <CoinList>
                {isLoading ? (<Loader>Loading...</Loader>) :
                    (coins?.map(coin =>
                            <Coin key={coin.id}>
                                <Link to={`${coin.id}`}>
                                    <CoinIcon src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        )
                    )
                }
            </CoinList>
        </Container>
    );
}

export default Coins;