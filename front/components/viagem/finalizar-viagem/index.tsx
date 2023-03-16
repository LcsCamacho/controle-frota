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
    const [success, setSuccess] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [currentTrip, setCurrentTrip] = useState<Trip>({

    });
    const selectRef = useRef<HTMLSelectElement | null>(null);



    const finalizarViagem = (id: string) => {
        fetch('http://localhost:3000/viagem/finalizar/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': user.token
            },
            body: JSON.stringify({})
        })
    }

    function submitForm(event: any): void {
        event.preventDefault();
        console.log(selectedTrip)
        // finalizarViagem(selectedTrip)
        refetch()
    }

    useLayoutEffect(() => {
        if (selectRef.current) {
            setCurrentTrip(selectRef.current.value)
        }
    },[])

    useEffect(()=>{
        console.log({currentTrip})
    },[currentTrip])
        

    useEffect(() => {
        fetch('http://localhost:3000/viagem/' + selectedTrip)
            .then(response => response.json())
            .then(data => {
                setCurrentTrip(data)
            })
    }, [selectedTrip])

    return (
        <>
            <div className={styles.inserirViagemContainer}>
                <div className={styles.inserirViagemContent}>
                    <h1>Finalizar Viagem</h1>
                    <form onSubmit={submitForm} className={styles.form}>
                        <div className={styles.formItem}>
                            <label htmlFor="veiculo">Veiculo</label>
                            <select ref={selectRef} onChange={(e) => setSelectedTrip(e.currentTarget.value)}>
                                {viagensAndamentoProps.map((viagem: Trip) => {
                                    return (
                                        <option key={Number(viagem.id)} value={String(viagem.id)}>{viagem.Vehicle.plate}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className={styles.formItem}>
                            {/* {currentTrip.length > 0 && (
                                <div className={styles.currentTrip}>
                                    <span>Veiculo: {currentTrip.Vehicle.plate}</span>
                                    <span>Data: {new Date(currentTrip.date).toLocaleString()}</span>
                                </div>
                            )} */}
                        </div>
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