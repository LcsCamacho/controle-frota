import Header from 'components/header-dashboard/header';
import HeaderUser from 'components/header-user/header-user';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import DashboardCar from 'components/dashboard-car/dashboard';
import DashboardMotorista from 'components/dashboard-motorista/dashboard';

export default function Dashboard() {
    const dashboardCar = useSelector((state: any) => state.car.open);
    const dashboardMotorista = useSelector((state: any) => state.driver.open);

    return (
        <>
            <div className={styles.dashboardContainer}>
                <HeaderUser />
                <Header />
                <div className={styles.dashboardContent}>
                    {dashboardCar && <DashboardCar />}
                    {dashboardMotorista && <DashboardMotorista />}
                </div>
            </div>
        </>
    );
}
