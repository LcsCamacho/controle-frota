import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import { ListarCarroProps, Vehicle } from 'types';
import { useRemoveVehicle } from 'hooks/UseRemoveVehicle';


export default function ListarCarro({vehiclesList}:ListarCarroProps) {
    const { removeVehicle } = useRemoveVehicle();
    const { user } = useSelector((state: any) => state.user);


    return (
        <>
            <div className={styles.listVehicleContainer}>
                <div className={styles.listVehicleContent}>
                    <h1>Lista de Carros</h1>
                    <h2>Quantidade: {vehiclesList.length}</h2>
                    <div className={styles.vehicleList}>
                        {vehiclesList.map((vehicle: Vehicle, index: any) => {
                            return (
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
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );

}
