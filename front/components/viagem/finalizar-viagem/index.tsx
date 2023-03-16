import { Trip } from 'types';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useLayoutEffect, useEffect, useState, useRef } from 'react';

interface ViagensAndamentoProps {
    viagensAndamentoProps: Trip[];
    refetch: any;
}

export default function FinalizarViagem({ viagensAndamentoProps, refetch }: ViagensAndamentoProps) {
    const { user } = useSelector((state: any) => state.user);
    const [loadingCurrentTrip, setLoadingCurrentTrip] = useState(true);
    const [success, setSuccess] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [currentTrip, setCurrentTrip] = useState<Trip>(viagensAndamentoProps[0])
    const selectRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        setSelectedTrip(selectRef.current?.value || '')
    }, [])

    useEffect(() => {
        setLoadingCurrentTrip(false)
    }, [currentTrip])

    useEffect(() => {
        fetch('http://localhost:3000/viagem/' + selectedTrip)
            .then(response => response.json())
            .then(data => {
                setCurrentTrip(data)
            })
    }, [selectedTrip])

    const finalizarViagem = (id: string) => {
        fetch('http://localhost:3000/viagem/finalizar/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': user.token
            },
            body: JSON.stringify({
                DriverId: currentTrip.DriverId,
                VehicleId: currentTrip.VehicleId,
            })
        })
            .then(() => {
                refetch()
            })
    }

    function submitForm(event: any): void {
        event.preventDefault();
        finalizarViagem(selectedTrip)
    }

    return (
        <>
            <div className={styles.inserirViagemContainer}>
                <div className={styles.inserirViagemContent}>
                    <h1>Finalizar Viagem</h1>
                    <form onSubmit={submitForm} className={styles.form}>
                        <div className={styles.formItem}>
                            <label htmlFor="veiculo">Veiculo</label>
                            <select ref={selectRef} onChange={(e) => setSelectedTrip(e.currentTarget.value)}>
                                {viagensAndamentoProps.length > 0 ? viagensAndamentoProps.map((viagem: Trip) => {
                                    return (
                                        <option key={Number(viagem.id)} value={String(viagem.id)}>{viagem.Driver.name} - {viagem.Vehicle.plate} </option>
                                    )
                                }) : <option value="">Nenhuma viagem em andamento</option>}
                            </select>
                        </div>
                        {<div className={styles.formItem}>
                            {loadingCurrentTrip ? <>Loading...</> : (<>
                                <h3>Descrição da viagem</h3>
                                <div className={styles.currentTrip}>
                                    <span>Inicio da viagem: data e hora = {new Date(currentTrip.date).toLocaleString()}</span>
                                </div>
                            </>)}
                        </div>}
                        <div className={styles.formItem}>
                            <button type="submit">Enviar</button>
                        </div>

                        {success && <h1>Viagem adicionada com sucesso!</h1>}
                    </form>
                </div>
            </div>
        </>
    )
}