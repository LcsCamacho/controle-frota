import styles from './style.module.scss';
import { FcApproval } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Vehicle } from 'types';
import { useRemoveVehicle } from 'hooks/UseRemoveVehicle';
import { useState, useEffect } from 'react';


export interface ListarCarroDispProps {
    vehiclesListDisp: Vehicle[];
    refetch: any;
}

export default function ListarDisponiveis({ vehiclesListDisp: vehiclesList, refetch }: ListarCarroDispProps) {
    const { user } = useSelector((state: any) => state.user);
    const { removeVehicle } = useRemoveVehicle();
    const [listaVeiculos, setListaVeiculos] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState<String>('');
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

    const handleRemoveVehicle = (id: string) => {
        removeVehicle(id, user.token)
            .then(() => {
                refetch()
            })
    }

    return (
        <>
            <div className={styles.listVehicleContainer}>
                <div className={styles.listVehicleContent}>
                    <h1>Lista de Veiculos</h1>
                    <div className={styles.buscar}>
                    <label htmlFor="search">Buscar por placa: </label>
                    <input type='search' id='search' placeholder="Digite a placa do veiculo" onChange={(e)=> {
                        setSearch(e.target.value)
                    }} />
                </div>
                    <h2>Quantidade: {vehiclesList.length}</h2>
                    <div className={styles.vehicleList}>
                        {listaVeiculos.map((vehicle: Vehicle, index: any) => (
                            <div className={styles.vehicleItem} key={index}>
                                <span><b>Modelo:</b>{vehicle.model}</span>
                                <span><b>Placa:</b>{vehicle.plate}</span>
                                <span><b>Tipo:</b>{vehicle.type}</span>

                                <span><FcApproval /></span>

                                {user.management && (
                                    <div className={styles.vehicleItemButtons}>
                                        <button 
                                            onClick={() => handleRemoveVehicle(String(vehicle.id))}>Excluir</button>
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
