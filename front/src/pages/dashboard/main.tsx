import Header from 'components/header-dashboard/header';
import HeaderUser from 'components/header-user/header-user';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import DashboardGeral from 'components/dashboard-descricao-geral';
import { useQuery } from 'react-query';
import { useState } from 'react';
import DashboardManutencao from 'components/manutencoes/dashboard-manutencao/dashboard';
import DashboardMotorista from 'components/motoristas/dashboard-motorista/dashboard';
import DashboardVeiculo from 'components/veiculos/dashboard-veiculos/dashboard';
import DashboardViagem from 'components/viagem/dashboard-viagem/dashboard';


export default function Dashboard() {
    const dashboardVeiculos = useSelector((state: any) => state.vehicle.open);
    const dashboardMotorista = useSelector((state: any) => state.driver.open);
    const dashboardManutencao = useSelector((state: any) => state.maintenance.open);
    const dashboardViagem = useSelector((state: any) => state.trip.open);

    const [all, setAll] = useState({
        vehicles: [],
        drivers: [],
        maintenances: [],
        vehiclesInMaintenance: [],
        vehiclesInTrip:[]
    });

    const fetchs = async () => {
        const [fvehicles, fdrivers, fmaintenances, fvehiclesInMaintenance, fvehiclesInTrip] = await Promise.all([
            fetch('http://localhost:3000/veiculo'),
            fetch('http://localhost:3000/motorista'),
            fetch('http://localhost:3000/manutencao'),
            fetch('http://localhost:3000/veiculos-manutencao'),
            fetch('http://localhost:3000/viagem')
        ]);
        const [vehicles, drivers, maintenances,vehiclesInMaintenance, vehiclesInTrip] = await Promise.all([
            fvehicles.json(),
            fdrivers.json(),
            fmaintenances.json(),
            fvehiclesInMaintenance.json(),
            fvehiclesInTrip.json()
        ]);
        setAll({
            vehicles,
            drivers,
            maintenances,
            vehiclesInMaintenance,
            vehiclesInTrip
        })
        
    };

    const queryOptions = {
        retry: 2,
        refetchOnWindowFocus: true,
        refetchInterval: 5000,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
    }

    const { isLoading, isError } = useQuery('dashboard', fetchs, queryOptions);

    if(isLoading) return <div>Carregando...</div>
    if(isError) return <div>Erro ao carregar...</div>

    return (
        <>
            <div className={styles.dashboardContainer}>
                <HeaderUser />
                <Header />
                    {<DashboardGeral dados={all} />}
                <div className={styles.dashboardContent}>
                    {dashboardVeiculos && <DashboardVeiculo />}
                    {dashboardMotorista && <DashboardMotorista />}
                    {dashboardManutencao && <DashboardManutencao />}
                    {dashboardViagem && <DashboardViagem />}
                </div>
            </div>
        </>
    );
}
