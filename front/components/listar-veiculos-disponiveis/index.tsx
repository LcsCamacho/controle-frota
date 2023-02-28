import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { FcApproval } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Vehicle } from 'types';


export default function ListarDisponiveis() {
    const {user} = useSelector((state: any) => state.user);

    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);

    const listarVeiculos = async () => {
        const response = await fetch('http://localhost:3000/veiculo-disp',
            { cache: 'default' });
        const data = await response.json();
        setVehicleList(data);
    }

    useEffect(() => {
        listarVeiculos();
    }, []);

    return (
        <>
            <div className={styles.listVehicleContainer}>
                <div className={styles.listVehicleContent}>
                    <h1>Lista de Veiculos</h1>
                    <h2>Quantidade: {vehicleList.length}</h2>
                    <div className={styles.carList}>
                        {vehicleList.map((vehicle: Vehicle, index: any) => (
                            <div className={styles.carItem} key={index}>
                                <h2>Id:{String(vehicle.id)}</h2>
                                <h2>{vehicle.model}</h2>
                                <h2>{vehicle.plate}</h2>
                                <h2><FcApproval/></h2>

                                {user.management && (
                                    <div className={styles.vehicleItemButtons}>
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
