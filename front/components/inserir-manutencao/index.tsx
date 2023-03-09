import { useEffect, useState } from 'react';
import { Maintenance, Vehicle } from 'types';
import styles from './style.module.scss';
import { useAddMaintenance } from 'hooks/UseAddMaintenance';

export default function InserirManutencao() {

    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);


    const fetchVeiculos = async () => {
        const response = await fetch('http://localhost:3000/veiculo',
            { cache: 'default' });
        const data = await response.json();
        let avaliableVehicle = data.filter((veiculo:Vehicle) => veiculo.avaliable === true)
        setVehicleList(avaliableVehicle)
    }

    useEffect(() => {
        fetchVeiculos();
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const date = new Date().toLocaleString().slice(0, 10).replace('T', ' ');

        const data: Maintenance = {
            description: form.desc.value,
            cost: Number(form.cost.value),
            date,
            VehicleId: Number(form.vehicle.value)
        };
        console.log(data);
        useAddMaintenance(data);
        fetchVeiculos().then(() => clearForm(form))
    }

    const clearForm = (form: any) => {
        form.desc.value = '';
        form.cost.value = '';
    }

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
                </form>
            </div>
        </>
    );
}
