import Header from 'components/header-dashboard/header';
import HeaderUser from 'components/header-user/header-user';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import DashboardVeiculos from 'components/dashboard-veiculos/dashboard';
import DashboardMotorista from 'components/dashboard-motorista/dashboard';
import DashboardManutencao from 'components/dashboard-manutencao/dashboard';
import DashboardGeral from 'components/dashboard-descricao-geral';
import { useQuery } from 'react-query';


export default function Dashboard() {
    const dashboardVeiculos = useSelector((state: any) => state.vehicle.open);
    const dashboardMotorista = useSelector((state: any) => state.driver.open);
    const dashboardManutencao = useSelector((state: any) => state.maintenance.open);

    const fetchs = async () => {
        const [fvehicles, fdrivers, fmaintenances] = await Promise.all([
            fetch('http://localhost:3000/veiculo'),
            fetch('http://localhost:3000/motorista'),
            fetch('http://localhost:3000/manutencao')
        ]);
        const [vehicles, drivers, maintenances] = await Promise.all([
            fvehicles.json(),
            fdrivers.json(),
            fmaintenances.json()
        ]);
        return { vehicles, drivers, maintenances }
    };

    const queryOptions = {
        retry: 5,
        refetchOnWindowFocus: true,
        refetchInterval: 5000,
        initialState: {
            vehicles: ['', ''],
            drivers: ['', ''],
            maintenances: ['', '']
        }
    }

    const { data, isLoading } = useQuery('dashboard', fetchs, queryOptions);

    return (
        <>
            <div className={styles.dashboardContainer}>
                <HeaderUser />
                <Header />
                <div className={styles.dashboardContent}>
                    {data !== undefined && <DashboardGeral dados={data} />}
                    {dashboardVeiculos && <DashboardVeiculos />}
                    {dashboardMotorista && <DashboardMotorista />}
                    {dashboardManutencao && <DashboardManutencao />}
                </div>
            </div>
        </>
    );
}
