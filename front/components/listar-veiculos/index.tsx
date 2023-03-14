import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import { Vehicle } from 'types';
import { useRemoveVehicle } from 'hooks/UseRemoveVehicle';
import { useState, useEffect } from 'react';
export interface ListarCarroProps {
    vehiclesList: Vehicle[];
    refetch: any;
}

export default function ListarCarro({ vehiclesList, refetch }: ListarCarroProps) {
    const { removeVehicle } = useRemoveVehicle();
    const [listaVeiculos, setListaVeiculos] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState<String>('');
    const { user } = useSelector((state: any) => state.user);

    useEffect(() => {
        if(search.length === 0) {
            setListaVeiculos(vehiclesList)
            return
        }
        let x = listaVeiculos.filter((vehicle: Vehicle) => {
            return vehicle.plate.toLowerCase().includes(search.toLowerCase())
        })
        setListaVeiculos(x)
    }, [search])

    useEffect(() => {
        setListaVeiculos(vehiclesList)
    }, [])

    return (<>
        <div className={styles.listVehicleContainer}>
            <div className={styles.listVehicleContent}>
                <h1>Lista de Carros</h1>
                <div className={styles.buscar}>
                    <label htmlFor="search">Buscar por placa: </label>
                    <input type='search' id='search' placeholder="Digite a placa do veiculo" onChange={(e)=> {
                        setSearch(e.target.value)
                    }} />
                </div>
                <h2>Quantidade: {listaVeiculos.length}</h2>
                <div className={styles.vehicleList}>
                    {listaVeiculos.map((vehicle: Vehicle, index: any) => {
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
                                        <button onClick={() => {
                                            removeVehicle(String(vehicle.id), user.token)
                                                .then(() => {
                                                    refetch()
                                                })
                                        }}>Excluir</button>
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
