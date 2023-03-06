import styles from './style.module.scss';
import { FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { ListarCarroIndispProps, Vehicle } from 'types';



export default function ListarIndisponiveis({vehiclesListIndisp:vehiclesList}:ListarCarroIndispProps) {
    const {user} = useSelector((state: any) => state.user);


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
                                <h2><FcCancel/></h2>

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
