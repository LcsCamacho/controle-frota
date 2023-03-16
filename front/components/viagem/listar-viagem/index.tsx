import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import { Trip } from 'types';
import { useRemoveTrip } from 'hooks/UseRemoveTrip';

export interface ListarViagemProps {
    viagemListProps: Trip[];
    refetch: any;
}

export default function ListarViagem({ viagemListProps, refetch }: ListarViagemProps) {
    const [listaViagens, setListaViagens] = useState<Trip[]>([]);
    const { user } = useSelector((state: any) => state.user);
    const [search, setSearch] = useState<String>('');
    const { removeTrip } = useRemoveTrip()

    useEffect(() => {
        if (search.length === 0) {
            setListaViagens(viagemListProps)
            return
        }
        let x = listaViagens.filter((viagem: Trip) => {
            return viagem.Vehicle.plate.toLowerCase().includes(search.toLowerCase())
        })
        setListaViagens(x)
    }, [search])

    useEffect(() => {
        setListaViagens(viagemListProps)
    }, [])

    return (
        <>
            <div className={styles.listaViagemContainer}>
                <div className={styles.listaViagemContent}>
                    <h1>Lista de Viagens</h1>
                    <div className={styles.buscar}>
                        <label htmlFor="search">Buscar por placa: </label>
                        <input type='search' id='search' placeholder="Digite a placa do veiculo" onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
                    </div>
                    <h2>Quantidade: {listaViagens.length}</h2>
                    <div className={styles.viagemList}>
                        {listaViagens.map((viagem: Trip, index: any) => {
                            return (
                                <div className={styles.viagemItem} key={index}>
                                    <h2>Carro: {String(viagem.Vehicle.plate)}</h2>
                                    <h2>Motorista: {String(viagem.Driver.name)}</h2>
                                    <h2>Saida: {new Date(viagem.date).toLocaleString()}</h2>
                                    <h2>Chegada:{viagem.checkOut ? new Date(viagem.checkOut).toLocaleString() : <FcCancel />}</h2>
                                    {user.management && (
                                        <div className={styles.viagemItemButtons}>
                                            <button onClick={() => {
                                                removeTrip(String(viagem.id), user.token)
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
    )
}