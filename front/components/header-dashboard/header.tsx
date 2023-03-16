import styles from './header.module.scss';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { openDashboardReducerVehicle } from '../../features/redux/vehicle-slice';
import { openDashboardReducerDriver } from '../../features/redux/driver-slice';
import { openDashboardReducerMaintenance } from 'features/redux/maintence-slice';
import { useState, useEffect } from 'react';
import { openDashboardReducerTrip } from 'features/redux/trip-slice';


interface navProps {
    backgroundColor: string,
    color: string
}

export default function Header() {
    const dispatch = useDispatch();
    const vehicleOpen = useSelector((state: any) => state.vehicle.open);
    const driverOpen = useSelector((state: any) => state.driver.open);
    const maintenanceOpen = useSelector((state: any) => state.maintenance.open);
    const tripOpen = useSelector((state: any) => state.trip.open);

    const openStyles = {
        backgroundColor: 'red',
        color: '#fff'
    }
    
    const closedStyles = {
        backgroundColor: 'transparent',
        color: '#000'
    }

    const [styleMotorista, setStyleMotorista] = useState<navProps>(closedStyles);
    const [styleVeiculo, setStyleVeiculo] = useState<navProps>(closedStyles);
    const [styleManutencao, setStyleManutencao] = useState<navProps>(closedStyles);
    const [styleViagem, setStyleViagem] = useState<navProps>(closedStyles);

    const openDashboardVehicle = () => {
        dispatch(openDashboardReducerVehicle())
        setStyleVeiculo((state) => {
            return state = vehicleOpen ? closedStyles  : openStyles; 
        })
    }

    const openDashboardDriver = () => {
        dispatch(openDashboardReducerDriver())
        setStyleMotorista((state) => {
            return state = driverOpen ? closedStyles  : openStyles; 
        })
    }

    const openDashboardMaintenance = () => {
        dispatch(openDashboardReducerMaintenance())
        setStyleManutencao((state) => {
            return state = maintenanceOpen ? closedStyles  : openStyles; 
        })
    }
    const openDashboardViagem = () => {
        dispatch(openDashboardReducerTrip())
        setStyleViagem((state) => {
            return state = tripOpen ? closedStyles  : openStyles; 
        })
    }

    useEffect(() => {
        setStyleManutencao((state) => {
            return state = maintenanceOpen ? openStyles : closedStyles; 
        })
        setStyleMotorista((state) => {
            return state = driverOpen ? openStyles : closedStyles; 
        })
        setStyleVeiculo((state) => {
            return state = vehicleOpen ? openStyles : closedStyles; 
        })
        setStyleViagem((state) => {
            return state = tripOpen ? openStyles : closedStyles; 
        })
    }, [])

    return (
        <header className={styles.container}>
            <Image src={logo} style={{
                width: 'auto',
                height: 'auto',
                aspectRatio: '1/1',
            }} width={75} height={75} priority alt="Agrotech" />
            <div className={styles.headerContent}>
                <h1 onClick={openDashboardDriver} style={styleMotorista}>Motoristas</h1>
                <h1 onClick={openDashboardVehicle} style={styleVeiculo}>Veiculos</h1>
                <h1 onClick={openDashboardMaintenance} style={styleManutencao}>Manutenção</h1>
                <h1 onClick={openDashboardViagem} style={styleViagem}>Viagens</h1>
            </div>
        </header>
    )
}