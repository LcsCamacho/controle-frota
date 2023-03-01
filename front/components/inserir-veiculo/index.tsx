import { openDashboardReducerVehicle } from 'features/redux/vehicle-slice';
import { useDispatch } from 'react-redux';
import styles from './style.module.scss';
import { useState } from 'react';


export default function InserirCarro() {
    const dispatch = useDispatch();
    const [type, setType] = useState('Passeio');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const model = event.target.model.value;
        const plate = event.target.plate.value;
        
        const response = await fetch('http://localhost:3000/veiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model,
                plate,
                type
            })
        });

        let status = response.status === 200 ? true : false;

        alert(
            status ?
                'Carro inserido com sucesso' :
                'Erro ao inserir veículo'
        );
        if (status) {
            dispatch(openDashboardReducerVehicle())
            event.target.model.value = '';
            event.target.plate.value = '';
        }

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
                    <select onChange={(e)=> {setType(e.target.selectedOptions[0].value)}} name="type" id="type">
                        <option value="Passeio">Passeio</option>
                        <option value="Carga">Carga</option>
                    </select>
                    <button type="submit" >Inserir Carro a Frota</button>
                </div>
            </form>
        </div>
    )
}