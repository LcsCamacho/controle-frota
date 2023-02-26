import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';

type Car = {
    id: Number,
    model: String,
    plate: String,
    avaliable: Boolean,
}

export default function ListarIndisponiveis() {
    const {user} = useSelector((state: any) => state.user);

    const [carList, setCarList] = useState<Car[]>([]);

    const listarCarros = async () => {
        const response = await fetch('http://localhost:3000/car-indisp',
            { cache: 'default' });
        const data = await response.json();
        setCarList(data);
    }

    useEffect(() => {
        listarCarros();
    }, []);

    return (
        <>
            <div className={styles.listCarContainer}>
                <div className={styles.listCarContent}>
                    <h1>Lista de Carros</h1>
                    <h2>Quantidade: {carList.length}</h2>
                    <div className={styles.carList}>
                        {carList.map((car: Car, index: any) => (
                            <div className={styles.carItem} key={index}>
                                <h2>Id:{String(car.id)}</h2>
                                <h2>{car.model}</h2>
                                <h2>{car.plate}</h2>
                                <h2><FcCancel/></h2>

                                {user.management && (
                                    <div className={styles.carItemButtons}>
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
