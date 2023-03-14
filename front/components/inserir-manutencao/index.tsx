import { useState } from 'react';
import { Maintenance, Vehicle } from 'types';
import styles from './style.module.scss';
import { useAddMaintenance } from 'hooks/UseAddMaintenance';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export default function InserirManutencao() {
    const { addMaintenance } = useAddMaintenance();
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const {user} = useSelector((state: any) => state.user)


    const fetchVeiculos = async () => {
        const response = await fetch('http://localhost:3000/veiculo',
            { cache: 'default' });
        const data = await response.json();
        let avaliableVehicle = data.filter((veiculo: Vehicle) => veiculo.avaliable === true)
        setVehicleList(avaliableVehicle)
    }
    let queryOptions = { retry: false, refetchOnWindowFocus: true, refetchInterval: 5000 }

    const { isLoading, isError, refetch } = useQuery('inserirmanutencao', fetchVeiculos, queryOptions)

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
        addMaintenance(data,user.token)
            .then((res) => {
                console.log(res)
                setSuccess(true);
                form.desc.value = '';
                form.cost.value = '';
                refetch()   
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

    if(isLoading) return <h1>Carregando...</h1>
    if(isError) return <h1>Erro ao carregar</h1>

    return (
        <>
            <div className={styles.insertMaintenanceContainer}>
                <h1>Inserir Manutenção</h1>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.insertMaintenanceForm}>
                    <div className={styles.insertMaintenanceFormContent}>
                        <label htmlFor="vehicle">Veículo:</label>
                        <select name="vehicle" id={styles.vehicleSelect}>
                            {vehicleList.map((vehicle: Vehicle, index: any) => (
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
