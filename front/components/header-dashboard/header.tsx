import styles from './header.module.scss';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import { useDispatch } from 'react-redux';
import { openDashboardReducerVehicle } from '../../features/redux/vehicle-slice';
import { openDashboardReducerDriver } from '../../features/redux/driver-slice';
import { openDashboardReducerMaintenance } from 'features/redux/maintence';

export default function Header() {
    const dispatch = useDispatch();

    const openDashboardVehicle = () => {
        dispatch(openDashboardReducerVehicle())
    }

    const openDashboardDriver = () => {
        dispatch(openDashboardReducerDriver())
    }

    const openDashboardMaintenance = () => {
        dispatch(openDashboardReducerMaintenance())
    }

    return (
        <header className={styles.container}>
            <Image src={logo} width={75} height={75} alt="Agrotech" />
            <div className={styles.headerContent}>
                <h1 onClick={openDashboardDriver}>Motoristas</h1>
                <h1 onClick={openDashboardVehicle}>Veiculos</h1>
                <h1 onClick={openDashboardMaintenance}>Manutenção</h1>
            </div>
        </header>
    )
}