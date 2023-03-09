import { useState, useEffect } from 'react';
import { Vehicle } from 'types';
import styles from './style.module.scss';
import { useQuery } from 'react-query';
import { useListVehiclesInMaintenance } from 'hooks/UseListVehiclesInMaintenance';


export default function FinalizarManutencao() {

  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);


  const fetchVeiculos = async () => {
    const response = await fetch('http://localhost:3000/veiculo',
      { cache: 'default' });
    const data = await response.json();
    useListVehiclesInMaintenance()
    let avaliableVehicle = data.filter((veiculo: Vehicle) => !veiculo.avaliable)
    setVehicleList(avaliableVehicle)
  }

  let queryOptions = { retry: 5, refetchOnWindowFocus: true, refetchInterval: 5000 }

  const { isLoading, isError } = useQuery('finalizarManutencao', fetchVeiculos, queryOptions)

  if (isLoading) return <h1>Carregando...</h1>
  if (isError) return <h1>Erro ao carregar</h1>

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const vehicleId = event.target.vehicle.value;

    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checkout: new Date()
      })
    }

    fetch(`http://localhost:3000/veiculo/finalizar/${vehicleId}`, options)
      .then(response => response.json())
      .then(data => {
        event.target.vehicle.value = '';
        console.log(data)
      })
  }

  return (
    <>
      <div className={styles.finalizarContainer}>
        <h1>Finalizar Manutenção</h1>
        <form onSubmit={handleSubmit} className={styles.finalizarForm}>
          <div className={styles.finalizarFormContent}>
            <label htmlFor="vehicle">Veículo:</label>
            <select name="vehicle" id={styles.vehicleSelect}>
              {vehicleList.map((vehicle: Vehicle) => (
                <option key={String(vehicle.id)} value={String(vehicle.id)}>
                  {String(vehicle.id)}. {vehicle.model} {vehicle.plate}
                </option>
              ))}
            </select>
            <button type="submit">Adicionar</button>
          </div>
        </form>
      </div>
    </>
  )
}