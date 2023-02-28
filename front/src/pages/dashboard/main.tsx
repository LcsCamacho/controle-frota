import Header from 'components/header-dashboard/header';
import HeaderUser from 'components/header-user/header-user';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import DashboardVeiculos from 'components/dashboard-veiculos/dashboard';
import DashboardMotorista from 'components/dashboard-motorista/dashboard';

export default function Dashboard() {
    const dashboardVeiculos = useSelector((state: any) => state.vehicle.open);
    const dashboardMotorista = useSelector((state: any) => state.driver.open);

    return (
        <>
            <div className={styles.dashboardContainer}>
                <HeaderUser />
                <Header />
                <div className={styles.dashboardContent}>
                    {dashboardVeiculos && <DashboardVeiculos />}
                    {dashboardMotorista && <DashboardMotorista />}
                </div>
            </div>
        </>
    );
}
