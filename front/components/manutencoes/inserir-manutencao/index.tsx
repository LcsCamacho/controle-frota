import { useState } from 'react';
import { Maintenance, Vehicle } from 'types';
import styles from './style.module.scss';
import { useAddMaintenance } from 'hooks/UseAddMaintenance';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { MaintenanceProps } from '../listar-manutencoes';

export interface VehicleProps {
    data: Vehicle[],
    refetch: any
}

export default function InserirManutencao({ data, refetch }: VehicleProps) {
    const { addMaintenance } = useAddMaintenance();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useSelector((state: any) => state.user)


    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const data: Maintenance = {
            description: form.desc.value,
            cost: Number(form.cost.value),
            date: new Date(),
            VehicleId: Number(form.vehicle.value),
            checkIn: new Date(),
        };
        console.log(data);
        addMaintenance(data, user.token)
            .then((res) => {
                refetch()
                console.log(res)
                setSuccess(true);
                form.desc.value = '';
                form.cost.value = '';
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
            .catch((err) => {
                console.log(err)
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 3000);
            });
    }

    return (
        <>
            <div className={styles.insertMaintenanceContainer}>
                <h1>Inserir Manutenção</h1>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.insertMaintenanceForm}>
                    <div className={styles.insertMaintenanceFormContent}>
                        <label htmlFor="vehicle">Veículo:</label>
                        <select name="vehicle" id={styles.vehicleSelect}>
                            {data.filter((vehicle)=> !vehicle.avaliable).map((vehicle: Vehicle) => (
                                <option key={String(vehicle.id)} value={String(vehicle.id)}>
                                    {String(vehicle.id)} {vehicle.model} {vehicle.plate}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="description">Descrição</label>
                        <textarea placeholder="Insira a descrição da Manutenção" id="desc" required />
                        <label htmlFor="cost">Custo:</label>
                        <input placeholder="Insira o custo da Manutenção" type="text" id="cost" required />
                        <button type="submit">Adicionar</button>
                    </div>
                    {success && <p>Manutenção adicionada com sucesso!</p>}
                    {error && <p>Erro ao adicionar manutenção</p>}
                </form>
            </div>
        </>
    );
}
