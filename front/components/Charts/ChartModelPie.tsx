import Chart, { GoogleChartWrapperChartType } from "react-google-charts";

type DataType = [string, number] | [string, string];

interface ChartsProps {
    data: DataType[];
    title: string;
    strChartType: GoogleChartWrapperChartType;
}

export default function ChartModelPie({ strChartType,data, title }: ChartsProps) {


    return (
        <Chart
            chartType = {strChartType}
            loader={<div>Loading Chart</div>}
            chartEvents={[
                {
                    eventName: 'select',
                    callback: ({ chartWrapper }: any) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length === 0) return;
                        const [selectedItem] = selection;
                        const { row } = selectedItem;
                        const status = chartWrapper.getDataTable()?.getValue(row, 0);
                        console.log(status);
                    }
                }
            ]}
            data={data}
            legendToggle
            options={{
                title: title,
                is3D: true,
                legend: {
                    position: 'bottom',
                    alignment: 'center',
                    textStyle: {
                        color: '#233238',
                        fontSize: 14
                    }
                }
            }}
        />
    )
}