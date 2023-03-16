import styles from './header.module.scss';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { openDashboardReducerVehicle } from '../../features/redux/vehicle-slice';
import { openDashboardReducerDriver } from '../../features/redux/driver-slice';
import { openDashboardReducerMaintenance } from 'features/redux/maintence-slice';
import { useState, useEffect } from 'react';
import { openDashboardReducerTrip } from 'features/redux/trip-slice';
import { useToggleColor } from 'hooks/UseToogleColor';


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

    useEffect(() => {
        useToggleColor(tripOpen)
        useToggleColor(driverOpen)
        useToggleColor(vehicleOpen)
        useToggleColor(maintenanceOpen)
    }, [])

    return (
        <header className={styles.container}>
            <Image src={logo} style={{
                width: 'auto',
                height: 'auto',
                aspectRatio: '1/1',
            }} width={75} height={75} priority alt="Agrotech" />
            <div className={styles.headerContent}>
                <h1 onClick={() => dispatch(openDashboardReducerDriver())} style={useToggleColor(driverOpen)}>Motoristas</h1>
                <h1 onClick={() => dispatch(openDashboardReducerVehicle())} style={useToggleColor(vehicleOpen)}>Veiculos</h1>
                <h1 onClick={() => dispatch(openDashboardReducerMaintenance())} style={useToggleColor(maintenanceOpen)}>Manutenção</h1>
                <h1 onClick={() => dispatch(openDashboardReducerTrip())} style={useToggleColor(tripOpen)}>Viagens</h1>
            </div>
        </header>
    )
}