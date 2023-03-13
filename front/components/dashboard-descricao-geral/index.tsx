
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Driver, Vehicle, Maintenance } from 'types';
import { useQuery } from 'react-query';
import ChartModelPie from 'components/Charts/ChartModelPie';
import { MdOutlineVisibility } from 'react-icons/md';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import ChartModelColumn from 'components/Charts/ChartModelColumn';

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
  const [cargaVeiculos, setCargaVeiculos] = useState<Vehicle[]>([]);
  const [passeioVeiculos, setPasseioVeiculos] = useState<Vehicle[]>([]);
  

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
    console.log(x)
    setVeiculosEmManutencao(x);
  }

  const getVeiculosCarga = () => {
    console.log(veiculosEmManutencao)
    let x = veiculosEmManutencao.filter((vehicle) => vehicle.type === 'Carga')
    setCargaVeiculos(x);
  }

  const getVeiculosPasseio = () => {
    let x = veiculosEmManutencao.filter((vehicle) => vehicle.type === 'Passeio')
    setPasseioVeiculos(x);
  }

  const getMotoristasViagem = () => {
    let x = drivers.filter((driver) => !driver.avaliable)
    setMotoristasEmViagem(x);
  }

  useEffect(() => {
    getVeiculosManutencao()
    getMotoristasViagem()
    getVeiculosPasseio()
    getVeiculosCarga()
  }, []);

  if (isLoading) return <h1>Carregando...</h1>
  if (isError) return <h1>Erro ao carregar</h1>

  return (
    <>
      <div className={styles.dashboardGeralContainer}>
        <div className={styles.dashboardGeralHeader}>
          <h1>Dashboard Geral</h1>
          <div className={styles.dashboardGeralHeaderButtons}>
            <span onClick={() => setShowData(!showData)}>{showData ? <AiOutlineEyeInvisible /> : <MdOutlineVisibility />}</span>
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
                  <span>Em andamento: {maintenances.length}</span>

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
                  <span>Veiculos de carga: {cargaVeiculos.length}</span>
                  <span>Veiculos de passeio: {passeioVeiculos.length}</span>
                </div>

              </div>
            </div>
          </div>
            <h2>Gráficos</h2>
            <div className={styles.chartsContainer}>
              <div className={styles.motoristasCharts}>

                <ChartModelPie
                  strChartType='PieChart'
                  data={[
                    ['Total', 'Manutenções'],
                    ['Motoristas ', drivers.length - motoristasEmViagem.length],
                    ['Em viagem', motoristasEmViagem.length]
                  ]}
                  title="Motoristas Disponiveis" />

              </div>

              <div className={styles.veiculosCharts}>

                <ChartModelPie
                  strChartType='PieChart'
                  data={[
                    ['Total', 'Manutenções'],
                    ['Veiculos ', vehicles.length - maintenances.length],
                    ['Manutenções', maintenances.length],
                  ]}
                  title='Status dos Veículos em manutenção' />

                <ChartModelPie
                  strChartType='PieChart'
                  data={[
                    ['Total', 'Manutenções'],
                    ['Veiculos ', vehicles.length - (veiculosIndisp.length - veiculosEmManutencao.length)],
                    ['Em viagem', veiculosIndisp.length - veiculosEmManutencao.length],
                  ]}
                  title='Status dos Veículos em viagem' />

              </div>

              <div className={styles.manutencoesCharts}>

                <ChartModelColumn
                  strChartType='ColumnChart'
                  data={[
                    ['Tipo', 'Carga', { role: 'style' }],
                    ['Carga', cargaVeiculos.length, 'blue'],
                    ['Passeio', passeioVeiculos.length, 'red'],
                  ]}
                  title='Tipos de Veículos em manutenção'
                />

                <ChartModelPie
                  strChartType='PieChart'
                  data={
                    [
                      ['Total', 'Manutenções'],
                      ['Manutenções ', maintenances.length],
                    ]}
                  title='Status das Manutenções em andamento' />

              </div>
            </div>
          </>)}
      </div>
    </>
  )
}