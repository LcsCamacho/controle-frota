import { useState, useEffect } from 'react';
import { Vehicle, VehiclesInMaintenance } from 'types';
import styles from './style.module.scss';
import { useQuery } from 'react-query';


export default function FinalizarManutencao() {

  const [vehicleList, setVehicleList] = useState<VehiclesInMaintenance[]>([]);

  const fetchVehiclesInMaintenance = async () => {
    const resp = await fetch('http://localhost:3000/veiculos-manutencao')
    const data = await resp.json();
    setVehicleList(data);

  }

  let queryOptions = { retry: false, refetchOnWindowFocus: true, refetchInterval: 5000 }

  const { isLoading, isError } = useQuery('finalizarManutencao', fetchVehiclesInMaintenance, queryOptions)

  if (isLoading) return <h1>Carregando...</h1>
  if (isError) return <h1>Erro ao carregar</h1>

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const vehicleId = event.target.vehicle.value;
    const idMaintenance = vehicleList.find(({ Vehicle }) => Vehicle.id === Number(vehicleId))?.id;

    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idMaintenance,
        checkout: new Date()
      })
    }

    fetch(`http://localhost:3000/manutencao/finalizar/${vehicleId}`, options)
      .then(response => response.json())
      .then(data => {
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
              {vehicleList.length > 0 ? vehicleList.map(({ Vehicle }) => (
                <option key={String(Vehicle.id)} value={String(Vehicle.id)}>
                  {String(Vehicle.id)}. {Vehicle.model} {Vehicle.plate}
                </option>
              ))
              : <option value="0">Nenhum veículo em manutenção</option>}
            </select>
            <button type="submit">Adicionar</button>
          </div>
        </form>
      </div>
    </>
  )
}