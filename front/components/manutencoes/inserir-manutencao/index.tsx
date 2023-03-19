import { useState } from 'react';
import { Vehicle } from 'types';
import styles from './style.module.scss';
import { useAddMaintenance } from 'hooks/UseAddMaintenance';
import { useSelector } from 'react-redux';
import { z } from 'zod';

export interface VehicleProps {
    data: Vehicle[],
    refetch: any
}

const schema = z.object({
    description: z.string(),
    cost: z.number(),
    date: z.date(),
    VehicleId: z.number(),
    checkIn: z.date(),
})

export type vehicleZodType = z.infer<typeof schema>
 

export default function InserirManutencao({ data, refetch }: VehicleProps) {
    const { addMaintenance } = useAddMaintenance();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useSelector((state: any) => state.user)


    const handleSubmit = (event: any) => {
        event.preventDefault();

        if(confirm('Deseja realmente inserir carro a manutenção?') === false) return;

        const form = event.target;
        const result = schema.parse({
            description: form.desc.value,
            cost: Number(form.cost.value),
            date: new Date(),
            VehicleId: Number(form.vehicle.value),
            checkIn: new Date(),
        })
 
        addMaintenance(result, user.token)
            .then(() => {
                refetch()
                setSuccess(true);
                form.desc.value = '';
                form.cost.value = '';
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
            .catch(() => {
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
                            {data.filter((vehicle)=> vehicle.avaliable).length > 0 ? 
                            data.filter((vehicle)=> vehicle.avaliable).map((vehicle: Vehicle) => (
                                <option key={String(vehicle.id)} value={String(vehicle.id)}>
                                    {String(vehicle.id)} {vehicle.model} {vehicle.plate}
                                </option>
                            )): <option>Nenhum veículo disponível</option>}
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
