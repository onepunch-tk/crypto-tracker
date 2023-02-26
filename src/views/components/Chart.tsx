import {useOutletContext } from 'react-router-dom';
import {useQuery} from "react-query";
import {fetchChart} from "../../controllers/apis/coin-api";
import {IChart} from "../../utils/coin-module";

function Chart() {
    const coinId = useOutletContext<string>();
    const {data} = useQuery<IChart[]>(["coins","charts",coinId], ()=>fetchChart(coinId));
    return (
        <h1>Chart</h1>
    );
}

export default Chart;