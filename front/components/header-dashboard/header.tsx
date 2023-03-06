import styles from './header.module.scss';
import Image from 'next/image';
import logo from '/public/logo.jpg';
import { useDispatch } from 'react-redux';
import { openDashboardReducerVehicle } from '../../features/redux/vehicle-slice';
import { openDashboardReducerDriver } from '../../features/redux/driver-slice';
import { openDashboardReducerMaintenance } from 'features/redux/maintence';
import { useState } from 'react';

export default function Header() {
    const dispatch = useDispatch();
    const [ styleMotorista, setStyleMotorista] = useState({
        backgroundColor: 'transparent',
        color: '#000'
    });
    const [ styleVeiculo, setStyleVeiculo] = useState({
        backgroundColor: 'transparent',
        color: '#000'
    });
    const [ styleManutencao, setStyleManutencao] = useState({
        backgroundColor: 'transparent',
        color: '#000'
    });

    const openDashboardVehicle = () => {
        dispatch(openDashboardReducerVehicle())
        if(styleVeiculo.backgroundColor === 'red') {
            setStyleVeiculo({
                backgroundColor: 'transparent',
                color: '#000'
            })
            return
        }
        setStyleVeiculo({
            backgroundColor: 'red',
            color: '#fff'
        })
    }

    const openDashboardDriver = () => {
        dispatch(openDashboardReducerDriver())
        if(styleMotorista.backgroundColor === 'red') {
            setStyleMotorista({
                backgroundColor: 'transparent',
                color: '#000'
            })
            return
        }
        setStyleMotorista({
            backgroundColor: 'red',
            color: '#fff'
        })
    }

    const openDashboardMaintenance = () => {
        dispatch(openDashboardReducerMaintenance())
        if(styleManutencao.backgroundColor === 'red') {
            setStyleManutencao({
                backgroundColor: 'transparent',
                color: '#000'
            })
            return
        }
        setStyleManutencao({
            backgroundColor: 'red',
            color: '#fff'
        })
    }

    return (
        <header className={styles.container}>
            <Image src={logo} width={75} height={75} alt="Agrotech" />
            <div className={styles.headerContent}>
                <h1 onClick={openDashboardDriver} style={styleMotorista}>Motoristas</h1>
                <h1 onClick={openDashboardVehicle} style={styleVeiculo}>Veiculos</h1>
                <h1 onClick={openDashboardMaintenance} style={styleManutencao}>Manutenção</h1>
            </div>
        </header>
    )
}