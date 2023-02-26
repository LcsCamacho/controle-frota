import styles from './header.module.scss';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import { useDispatch } from 'react-redux';
import { openDashboardReducer } from '../../features/redux/car-slice';

export default function Header() {
    const dispatch = useDispatch();

    const openDashboard = () => {
        dispatch(openDashboardReducer())
    }

    return (
        <header className={styles.container}>
            <Image src={logo} width={75} height={75} alt="Agrotech" />
            <div className={styles.headerContent}>
                <h1>Motoristas</h1>
                <h1 onClick={openDashboard}>Carros</h1>
                <h1>Manutenção</h1>
            </div>
        </header>
    )
}