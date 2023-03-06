
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { useEffect, useState } from 'react';
import { Driver, Vehicle, Maintenance } from 'types';
import { useQuery } from 'react-query';

interface DashboardGeralProps {
  dados: {
    vehicles: Vehicle[],
    drivers: Driver[],
    maintenances: Maintenance[]
  }
}

export default function DashboardGeral({ dados: { vehicles, drivers, maintenances } }: DashboardGeralProps) {
  const { user } = useSelector((state: any) => state.user);
  const [veiculosEmManutencao, setVeiculosEmManutencao] = useState<Vehicle[]>([]);
  const [veiculosIndisp, setVeiculosIndisp] = useState<Vehicle[]>([]);

  const { isLoading, isError } = useQuery('vehiclesIndisp', async () => {
    const response = await fetch(`http://localhost:3000/veiculo-indisp`);
    const data = await response.json();
    setVeiculosIndisp(data);
  });

  useEffect(() => {
    let x: any[] = []
    vehicles.forEach((vehicle) => {
      x = maintenances.filter((maintenance) => maintenance.VehicleId === vehicle.id);
    });
    setVeiculosEmManutencao(x);

  }, []);


  return (
    <>
      <div className={styles.dashboardGeralContainer}>
        <h1>Dashboard Geral</h1>
        <div className={styles.dashboardGeralContent}>
          <div className={styles.painelNumeros}>
            <h2>Totais</h2>
            <div className={styles.totais}>
              <div className={styles.totaisVeiculos}>
                <h4>Veiculos</h4>
                <span>Total: {vehicles.length}</span>
                <span>Indisponíveis: {veiculosIndisp.length}</span>
                <span>Disponíveis: {vehicles.length - veiculosIndisp.length} </span>
              </div>
              <div className={styles.totaisMotoristas}>
                <h4>Motoristas</h4>
                <span>Total: {drivers.length}</span>
                <span>Disponiveis: {
                  drivers.filter((driver: Driver) => driver.avaliable).length}</span>
              </div>
              <div className={styles.totaisManutencoes}>
                <h4>Manutenções</h4>
                <span>Total: {maintenances.length}</span>
              </div>
            </div>
            <h2>Derivados</h2>

            <div className={styles.derivados}>
              <div className={styles.derivadosVeiculos}>
                <h4>Veiculos</h4>
                <span>Em manutenção: {veiculosEmManutencao.length}</span>
                <span>Em viagem: {veiculosIndisp.length - veiculosEmManutencao.length}</span>
              </div>

              <div className={styles.derivadosMotoristas}>
                <h4>Motoristas</h4>
                <span>Viagem: {
                  drivers.filter((driver: Driver) => !driver.avaliable).length}</span>
              </div>

              <div className={styles.derivadosManutencoes}>
                <h4>Manutenções</h4>
                <span>Em andamento: {
                  maintenances.length}</span>
              </div>
            </div>
          </div>
        </div>
        <h2>Gráficos</h2>
        <div className={styles.charts}>
          <div className={styles.motoristasCharts}>
            <Chart
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              className={styles.chart}
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
                ['Motoristas ', drivers.length ],
                ['Manutenções', maintenances.length],
              ]}
              legendToggle
              options={{
                title: 'Motoristas',
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


          <div className={styles.veiculosCharts}>
            <Chart
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              className={styles.chart}
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
                ['Veiculos ', vehicles.length - maintenances.length],
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
            <Chart
              className={styles.chart}
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
                ['Veiculos ', vehicles.length - (veiculosIndisp.length - veiculosEmManutencao.length)],
                ['Em viagem', veiculosIndisp.length - veiculosEmManutencao.length],
              ]}
              legendToggle
              options={{
                title: 'Status dos Veiculos em viagem',
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
      </div>
    </>
  )
}