import Header from 'components/header-dashboard/header';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import DashboardCar from 'components/dashboard-car/dashboard';

export default function Dashboard() {
    const dashboardCar = useSelector((state: any) => state.car.open);

    return (
        <div className={styles.dashboardContainer}>
            <Header />

            <div className={styles.dashboardContent}>
                {dashboardCar && <DashboardCar />}
            </div>

        </div>
    );
}
