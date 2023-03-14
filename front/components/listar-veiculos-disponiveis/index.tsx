import styles from './style.module.scss';
import { FcApproval } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Vehicle } from 'types';
import { useRemoveVehicle } from 'hooks/UseRemoveVehicle';

export interface ListarCarroDispProps {
    vehiclesListDisp: Vehicle[];
    refetch: any;
}

export default function ListarDisponiveis({ vehiclesListDisp: vehiclesList, refetch }: ListarCarroDispProps) {
    const { user } = useSelector((state: any) => state.user);
    const { removeVehicle } = useRemoveVehicle();

    return (
        <>
            <div className={styles.listVehicleContainer}>
                <div className={styles.listVehicleContent}>
                    <h1>Lista de Veiculos</h1>
                    <h2>Quantidade: {vehiclesList.length}</h2>
                    <div className={styles.vehicleList}>
                        {vehiclesList.map((vehicle: Vehicle, index: any) => (
                            <div className={styles.vehicleItem} key={index}>
                                <h2>Id:{String(vehicle.id)}</h2>
                                <h2>{vehicle.model}</h2>
                                <h2>{vehicle.plate}</h2>
                                <h2><FcApproval /></h2>

                                {user.management && (
                                    <div className={styles.vehicleItemButtons}>
                                        <button>Editar</button>
                                        <button onClick={() => {
                                            removeVehicle(String(vehicle.id)).then(() => {
                                                refetch()
                                            })
                                        }}>Excluir</button>
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
