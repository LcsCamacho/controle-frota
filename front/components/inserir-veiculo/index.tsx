import { openDashboardReducerVehicle } from 'features/redux/vehicle-slice';
import { useDispatch } from 'react-redux';
import styles from './style.module.scss';
import { useState } from 'react';
import { useAddVehicle } from 'hooks/UseAddVehicle';
import { Vehicle } from 'types';


export default function InserirCarro() {
    const dispatch = useDispatch();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        let data:Vehicle = {
            model: event.target.model.value,
            plate: event.target.plate.value,
            type: event.target.type.value,
            avaliable: true
        }
        
        useAddVehicle(data)
        dispatch(openDashboardReducerVehicle())
    }

    return (
        <div className={styles.vehicleFormContainer}>
            <form className={styles.vehicleForm} onSubmit={handleSubmit}>
                <h1>Adicionar Veículo</h1>
                <div className={styles.vehicleFormInput}>
                    <label htmlFor="model">Modelo</label>
                    <input type="text" placeholder='Insira o Modelo' name="model" id="model" />
                    <label htmlFor="plate">Placa</label>
                    <input type="text" placeholder='Insira a Placa' name="plate" id="plate" />
                    <label htmlFor="type">Tipo:</label>
                    <select  name="type" id="type">
                        <option value="Passeio">Passeio</option>
                        <option value="Carga">Carga</option>
                    </select>
                    <button type="submit" >Inserir Carro a Frota</button>
                </div>
            </form>
        </div>
    )
}