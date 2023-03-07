
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { useEffect, useState } from 'react';
import { Driver, Vehicle, Maintenance } from 'types';
import { useQuery } from 'react-query';
import ChartModel from 'components/Charts/ChartModel';

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
  const [motoristasEmViagem, setMotoristasEmViagem] = useState<Driver[]>([]);
  const [showData, setShowData] = useState<boolean>(false);

  const { isLoading, isError } = useQuery('vehiclesIndisp', async () => {
    const response = await fetch(`http://localhost:3000/veiculo-indisp`);
    const data = await response.json();
    setVeiculosIndisp(data);
  });

  const getVeiculosManutencao = () => {
    let x: any[] = []
    vehicles.forEach((vehicle) => {
      x = maintenances.filter((maintenance) => maintenance.VehicleId === vehicle.id);
    });
    setVeiculosEmManutencao(x);
  }

  const getMotoristasViagem = () => {
    let x = drivers.filter((driver) => !driver.avaliable)
    setMotoristasEmViagem(x);
  }

  useEffect(() => {
    getVeiculosManutencao()
    getMotoristasViagem
  }, []);


  return (
    <>
      <div className={styles.dashboardGeralContainer}>
        <div className={styles.dashboardGeralHeader}>
          <h1>Dashboard Geral</h1>
          <div className={styles.dashboardGeralHeaderButtons}>
            <span onClick={() => setShowData(!showData)}>{showData ? 'Ocultar' : 'Mostrar'}</span>
          </div>
        </div>
        {showData && (
          <><div className={styles.dashboardGeralContent}>
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
                  <span>Disponiveis: {drivers.filter((driver: Driver) => driver.avaliable).length}</span>
                  <span>Indisponíveis: {drivers.filter((driver: Driver) => !driver.avaliable).length}</span>
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
                  <span>Viagem: {drivers.filter((driver: Driver) => !driver.avaliable).length}</span>
                </div>

                <div className={styles.derivadosManutencoes}>
                  <h4>Manutenções</h4>
                  <span>Em andamento: {maintenances.length}</span>
                </div>

              </div>
            </div>
          </div>
            <h2>Gráficos</h2>
            <div className={styles.chartsContainer}>
              <div className={styles.motoristasCharts}>

                <ChartModel
                  title="Motoristas Disponiveis"
                  data={[
                    ['Total', 'Manutenções'],
                    ['Motoristas ', drivers.length - motoristasEmViagem.length],
                    ['Em viagem', motoristasEmViagem.length]
                  ]} />

              </div>

              <div className={styles.veiculosCharts}>

                <ChartModel
                  data={[
                    ['Total', 'Manutenções'],
                    ['Veiculos ', vehicles.length - maintenances.length],
                    ['Manutenções', maintenances.length],
                  ]}
                  title='Status dos Veículos em manutenção' />

                <ChartModel
                  data={[
                    ['Total', 'Manutenções'],
                    ['Veiculos ', vehicles.length - (veiculosIndisp.length - veiculosEmManutencao.length)],
                    ['Em viagem', veiculosIndisp.length - veiculosEmManutencao.length],
                  ]}
                  title='Status dos Veículos em viagem' />

              </div>

              <div className={styles.manutencoesCharts}>

                <ChartModel
                  data={[
                    ['Total', 'Manutenções'],
                    ['Manutenções ', maintenances.length],
                  ]}
                  title='Status das Manutenções' />

              </div>
            </div>
          </>)}
      </div>
    </>
  )
}