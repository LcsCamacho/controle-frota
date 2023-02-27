import { useEffect, useState } from 'react';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Driver } from 'types';
import styles from './style.module.scss';


export default function ListarMotoristasDisponiveis() {
    const { user } = useSelector((state: any) => state.user);
    const [driverList, setDriverList] = useState<Driver[]>([]);

    const listarDrivers = async () => {
        const response = await fetch('http://localhost:3000/motoristas-disp',
            { cache: 'default' });
        const data = await response.json();
        setDriverList(data);
    }

    useEffect(() => {
        listarDrivers();
    }, []);

    return (
        <>
            <div className={styles.listDriverContainer}>
                <div className={styles.listDriverContent}>
                    <h1>Lista de Motoristas Disponíveis</h1>
                    <h2>Quantidade: {driverList.length}</h2>
                    <div className={styles.driverList}>
                        {driverList.map((driver: Driver, index: any) => (
                            <div className={styles.driverItem} key={index}>
                                <h2>Id:{String(driver.id)}</h2>
                                <h2>{driver.name}</h2>
                                <h2>{driver.avaliable ? <FcApproval /> : <FcCancel />}</h2>

                                {user.management && (
                                    <div className={styles.driverItemButtons}>
                                        <button>Editar</button>
                                        <button>Excluir</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

}
