import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Driver } from 'types';
import styles from './style.module.scss';
import { useRemoveDriver } from 'hooks/UseRemoveDriver';
import { useState, useEffect } from 'react';

interface driverListProps {
    driverListDisp: Driver[];
    refetch:any; 
}

export default function ListarMotoristasDisponiveis({driverListDisp:driverList, refetch}:driverListProps) {
    const { user } = useSelector((state: any) => state.user);
    const { removeDriver } = useRemoveDriver();

    const [listaMotorista, setListaMotorista] = useState<Driver[]>([]);
    const [search, setSearch] = useState<String>('');

    useEffect(() => {
        if(search.length === 0) {
            setListaMotorista(driverList)
            return
        }
        let x = listaMotorista.filter((motorista: Driver) => {
            return motorista.name.toLowerCase().includes(search.toLowerCase())
        })
        setListaMotorista(x)
    }, [search])

    useEffect(() => {
        setListaMotorista(driverList)
    }, [])

    const handleRemoveDriver = (id: string) => {
        removeDriver(id, user.token)
            .then(() => {
                refetch()
            })
    }
    return (
        <>
            <div className={styles.listDriverContainer}>
                <div className={styles.listDriverContent}>
                    <h1>Lista de Motoristas Disponíveis</h1>
                    <div className={styles.buscar}>
                        <label htmlFor="search">Buscar por nome: </label>
                        <input type='search' id='search' placeholder="Digite o nome do motorista" 
                            onChange={(e)=> {
                            setSearch(e.target.value)
                        }} />
                    </div>
                    <h2>Quantidade: {driverList.length}</h2>
                    <div className={styles.driverList}>
                        {driverList.map((driver: Driver, index: any) => (
                            <div className={styles.driverItem} key={index}>
                                <span><b>Id:</b>{String(driver.id)}</span>
                                <span><b>Nome: </b>{driver.name}</span>
                                <span>{driver.avaliable ? <FcApproval /> : <FcCancel />}</span>

                                {user.management && (
                                    <div className={styles.driverItemButtons}>
                                        <button onClick={() => handleRemoveDriver(String(driver.id))}>Excluir</button>
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
