import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Driver } from 'types';
import styles from './style.module.scss';

interface driverListProps {
    driverList: Driver[];
}

export default function ListarMotoristas({driverList}:driverListProps) {
    const { user } = useSelector((state: any) => state.user);


    return (
        <>
            <div className={styles.listDriverContainer}>
                <div className={styles.listDriverContent}>
                    <h1>Lista de Motoristas</h1>
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
