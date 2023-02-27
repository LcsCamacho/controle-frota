import styles from './header.module.scss';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import { useDispatch } from 'react-redux';
import { openDashboardReducerCar } from '../../features/redux/car-slice';
import { openDashboardReducerDriver } from '../../features/redux/driver-slice';

export default function Header() {
    const dispatch = useDispatch();

    const openDashboardCar = () => {
        dispatch(openDashboardReducerCar())
    }

    const openDashboardDriver = () => {
        dispatch(openDashboardReducerDriver())
    }

    return (
        <header className={styles.container}>
            <Image src={logo} width={75} height={75} alt="Agrotech" />
            <div className={styles.headerContent}>
                <h1 onClick={openDashboardDriver}>Motoristas</h1>
                <h1 onClick={openDashboardCar}>Carros</h1>
                <h1 onClick={()=> alert('manutenção')}>Manutenção</h1>
            </div>
        </header>
    )
}