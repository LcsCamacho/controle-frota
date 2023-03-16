import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { useAddTrip } from 'hooks/useAddTrip';
import { useFetchAny } from 'hooks/UseFetchAny';
import { Driver, Vehicle } from 'types';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function InserirViagem({ refetch }: any) {
    const { user } = useSelector((state: any) => state.user);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const { addTrip } = useAddTrip();
    const [success, setSuccess] = useState(false);

    const fetchs = async () => {
        const [driverFetch, vehicleFetch] = await Promise.all([
            fetch('http://localhost:3000/motoristas-disp'),
            fetch('http://localhost:3000/veiculo-disp')
        ])
        const [driverJson, vehicleJson] = await Promise.all([
            driverFetch.json(),
            vehicleFetch.json()
        ])
        setDrivers(driverJson)
        setVehicles(vehicleJson)
    }
    const queryOptions = { retry: 1, refetchOnWindowFocus: true, refetchInterval: 5000 }

    const { isLoading, isError, refetch:vehiclesAndDriversRefetch } = useQuery('inserirViagem',fetchs, queryOptions)

    const submitForm = (e: any) => {
        e.preventDefault();
        if(!confirm("Deseja realmente adicionar uma viagem?")) return
        let selectedOptionDriver = e.target.querySelectorAll('div select')[0].value;
        let selectedOptionVehicle = e.target.querySelectorAll('div select')[1].value;
        const driver = Number(selectedOptionDriver);
        const vehicle = Number(selectedOptionVehicle);

        const schema = z.object({
            DriverId: z.number(),
            VehicleId: z.number(),
            date: z.date(),
            checkIn: z.date(),
        });
        const result = schema.safeParse({
            "DriverId": driver,
            "VehicleId": vehicle,
            date: new Date(),
            checkIn: new Date(),

        });
        if (!result.success) {
            alert('Preencha todos os campos');
            return;
        }
        addTrip(result.data, user.token)
            .then(() => {
                refetch()
                vehiclesAndDriversRefetch()
                e.target.reset();
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 5000)
            })
    }

    if (isLoading) <h1>Carregando</h1>

    return (
        <>
            <div className={styles.inserirViagemContainer}>
                <div className={styles.inserirViagemContent}>
                    <h1>Inserir Viagem</h1>
                    <form onSubmit={submitForm} className={styles.form}>
                        <div className={styles.formItem}>
                            <label htmlFor="driver">Motorista</label>
                            {isError ? <span>Error</span> : (<select>
                                {drivers.map((driver: Driver) => {
                                    return (
                                        <option key={Number(driver.id)} value={String(driver.id)}>{driver.name}</option>
                                    )
                                })}
                            </select>)}
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor="vehicle">Veiculo</label>
                            {isError ? <span>Error</span> : (<select>

                                {vehicles.length > 0 ? vehicles.map((vehicle: Vehicle) => {
                                    return (
                                        <option key={String(vehicle.id)} value={String(vehicle.id)}>{vehicle.plate}</option>
                                    )
                                }) : <option>Nenhum veiculo disponivel</option>}
                            </select>)}
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