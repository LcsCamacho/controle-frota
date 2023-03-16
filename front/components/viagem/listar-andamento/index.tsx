import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Trip } from 'types';
import { useRemoveTrip } from 'hooks/UseRemoveTrip';

export interface ListarViagensAndamentoProps {
    viagemListProps: Trip[];
    refetch: any;
}

export default function ListarViagensAndamento({ viagemListProps, refetch }: ListarViagensAndamentoProps) {
    const { user } = useSelector((state: any) => state.user);
    const [search, setSearch] = useState<String>('');
    const [listaViagens, setListaViagens] = useState<Trip[]>([]);
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
                    <h1>Lista de Viagens em Andamento</h1>
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
                                    <span><b>Carro:</b>{String(viagem.Vehicle.plate)}</span>
                                    <span><b>Motorista:</b>{String(viagem.Driver.name)}</span>
                                    <span><b>Saida:</b> {new Date(viagem.date).toLocaleString()}</span>
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