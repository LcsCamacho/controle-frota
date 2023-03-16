import { useState, useEffect } from 'react';
import { Vehicle, VehiclesInMaintenance } from 'types';
import styles from './style.module.scss';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';


export default function FinalizarManutencao() {
  const {user} = useSelector((state: any) => state.user)
  const [vehicleList, setVehicleList] = useState<VehiclesInMaintenance[]>([]);

  const fetchVehiclesInMaintenance = async () => {
    const resp = await fetch('http://localhost:3000/veiculos-manutencao')
    const data = await resp.json();
    setVehicleList(data);

  }

  let queryOptions = { retry: false, refetchOnWindowFocus: true, refetchInterval: 5000 }

  const { isLoading, isError, refetch } = useQuery('finalizarManutencao', fetchVehiclesInMaintenance, queryOptions)

  if (isLoading) return <h1>Carregando...</h1>
  if (isError) return <h1>Erro ao carregar</h1>

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if(confirm('Deseja realmente finalizar a manutenção?') === false) return;

    const vehicleId = event.target.vehicle.value;
    const idMaintenance = vehicleList.find(({ Vehicle }) => Vehicle.id === Number(vehicleId))?.id;

    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': user.token
      },
      body: JSON.stringify({
        id: idMaintenance,
        checkout: new Date()
      })
    }

    fetch(`http://localhost:3000/manutencao/finalizar/${vehicleId}`, options)
      .then(()=> refetch())
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