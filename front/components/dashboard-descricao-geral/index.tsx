
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import Chart from 'react-google-charts';

export default function DashboardGeral({ dados: { vehicles, drivers, maintenances } }: any) {
  const { user } = useSelector((state: any) => state.user);


  return (
    <>
      <div className={styles.dashboardGeralContainer}>
        <h1>Dashboard Geral</h1>
        <div className={styles.dashboardGeralContent}>
          <span>Quantidade total de motoristas: {drivers !== undefined ? drivers.length : 0}</span>
          <span>Quantidade total de veículos: {vehicles !== undefined ? vehicles.length : 0}</span>
          <span>Quantidade total de manutenções: {maintenances !== undefined ? maintenances.length : 0}</span>
        </div>
        <div id={styles.charts}>
          <Chart
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            chartEvents={[
              {
                eventName: 'select',
                callback: ({ chartWrapper }) => {
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
            data={[
              ['Total', 'Manutenções'],
              ['Veiculos', vehicles.length - maintenances.length],
              ['Manutenções', maintenances.length],
            ]}
            legendToggle
            options={{
              title: 'Status das Manutenções em andamento',
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
        </div>
      </div>
    </>
  )
}