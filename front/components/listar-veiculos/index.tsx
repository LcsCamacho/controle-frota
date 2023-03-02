import { useEffect, useState } from 'react';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import { Vehicle } from 'types';
import { useRemoveVehicle } from 'hooks/UseRemoveVehicle';
import { useListVehicle } from 'hooks/UseListVehicle';

export default function ListarCarro() {
    const { removeVehicle } = useRemoveVehicle();
    const { user } = useSelector((state: any) => state.user);

    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);


    useEffect(() => {
        useListVehicle()
        .then(({vehicles}) => setVehicleList(vehicles));
    }, []);


    return (
        <>
            <div className={styles.listVehicleContainer}>
                <div className={styles.listVehicleContent}>
                    <h1>Lista de Carros</h1>
                    <h2>Quantidade: {vehicleList.length}</h2>
                    <div className={styles.vehicleList}>
                        {vehicleList.map((vehicle: Vehicle, index: any) => (
                            <div className={styles.vehicleItem} key={index}>
                                <h2>Id:{String(vehicle.id)}</h2>
                                <h2>{vehicle.model}</h2>
                                <h2>{vehicle.plate}</h2>
                                <h2>{vehicle.type}</h2>
                                <h2>{vehicle.avaliable ? <FcApproval /> : <FcCancel />}</h2>

                                {user.management && (
                                    <div className={styles.vehicleItemButtons}>
                                        <button>Editar</button>
                                        <button onClick={() => removeVehicle(String(vehicle.id))}>Excluir</button>
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
