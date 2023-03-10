import Header from 'components/header-dashboard/header';
import HeaderUser from 'components/header-user/header-user';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import DashboardVeiculos from 'components/dashboard-veiculos/dashboard';
import DashboardMotorista from 'components/dashboard-motorista/dashboard';
import DashboardManutencao from 'components/dashboard-manutencao/dashboard';
import DashboardGeral from 'components/dashboard-descricao-geral';
import { useQuery } from 'react-query';
import { useState } from 'react';


export default function Dashboard() {
    const dashboardVeiculos = useSelector((state: any) => state.vehicle.open);
    const dashboardMotorista = useSelector((state: any) => state.driver.open);
    const dashboardManutencao = useSelector((state: any) => state.maintenance.open);

    const [all, setAll] = useState({
        vehicles: [],
        drivers: [],
        maintenances: [],
        vehiclesInMaintenance: []
    });

    const fetchs = async () => {
        const [fvehicles, fdrivers, fmaintenances, fvehiclesInMaintenance] = await Promise.all([
            fetch('http://localhost:3000/veiculo'),
            fetch('http://localhost:3000/motorista'),
            fetch('http://localhost:3000/manutencao'),
            fetch('http://localhost:3000/veiculos-manutencao')
        ]);
        const [vehicles, drivers, maintenances,vehiclesInMaintenance] = await Promise.all([
            fvehicles.json(),
            fdrivers.json(),
            fmaintenances.json(),
            fvehiclesInMaintenance.json()
        ]);
        setAll({
            vehicles,
            drivers,
            maintenances,
            vehiclesInMaintenance
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
                <div className={styles.dashboardContent}>
                    {<DashboardGeral dados={all} />}
                    {dashboardVeiculos && <DashboardVeiculos />}
                    {dashboardMotorista && <DashboardMotorista />}
                    {dashboardManutencao && <DashboardManutencao />}
                </div>
            </div>
        </>
    );
}
