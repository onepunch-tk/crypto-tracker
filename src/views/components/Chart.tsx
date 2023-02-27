import {useOutletContext} from 'react-router-dom';
import {useQuery} from "react-query";
import {fetchChart} from "../../controllers/apis/coin-api";
import {IChart} from "../../utils/coin-module";
import ApexChart from "react-apexcharts";

function Chart() {
    const coinId = useOutletContext<string>();
    const {data, isLoading} = useQuery<IChart[] | IChart>(["coins", "charts", coinId], () => fetchChart(coinId));
    return (
        <div>
            {isLoading ? "Loading chart..." : (
                (data as IChart)?.error ? (data as IChart)?.error :
                    <ApexChart
                        type={"line"}
                        series={[
                            {
                                name: "Price",
                                data: (data as IChart[])?.map(price => Number(price.close))
                            }
                        ]}
                        options={{
                            theme: {
                                mode: "dark",

                            },
                            chart: {
                                height: 500,
                                width: 500,
                                toolbar: {
                                    show: false
                                },
                                background: "#2f3640"
                            },
                            stroke: {
                                width: 2,
                                curve: "smooth"
                            },
                            xaxis: {
                                labels: {
                                    show: false
                                },
                                axisTicks: {
                                    show: false
                                },
                                axisBorder: {
                                    show: false
                                },
                                categories:(data as IChart[])?.map(price => new Date(price.time_close).toUTCString()),
                                type:"datetime"
                            },
                            yaxis: {
                                show: false
                            },
                            fill: {
                                type: "gradient",
                                gradient: {
                                    gradientToColors: ["blue"],
                                    stops:[0,100]
                                },
                            },
                            colors: ["red"],
                            tooltip:{
                                y:{
                                    formatter:(val)=>`$${val}`
                                },
                                x:{
                                    format:"dd/MM/yy HH:mm:sss"
                                }
                            }
                        }}
                    />
            )}
        </div>
    );
}

export default Chart;