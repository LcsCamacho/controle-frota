import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { useAddTrip } from 'hooks/useAddTrip';
import { useFetchAny } from 'hooks/UseFetchAny';
import { Driver, Vehicle } from 'types';
import { useState } from 'react';

export default function InserirViagem({ refetch }: any) {
    const { user } = useSelector((state: any) => state.user);
    const { addTrip } = useAddTrip();
    const [success, setSuccess] = useState(false);

    const { response: drivers, error: driversError } = useFetchAny('http://localhost:3000/motoristas-disp');
    const { response: vehicles, error: vehiclesError} = useFetchAny('http://localhost:3000/veiculo-disp');

    const submitForm = (e: any) => {
        e.preventDefault();
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
                e.target.reset();
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 5000)
            })
    }
    return (
        <>
            <div className={styles.inserirViagemContainer}>
                <div className={styles.inserirViagemContent}>
                    <h1>Inserir Viagem</h1>
                    <form onSubmit={submitForm} className={styles.form}>
                        <div className={styles.formItem}>
                            <label htmlFor="driver">Motorista</label>
                            {driversError ? <span>Error</span> : (<select>
                                {drivers.map((driver: Driver) => {
                                    return (
                                        <option key={Number(driver.id)} value={String(driver.id)}>{driver.name}</option>
                                    )
                                })}
                            </select>)}
                        </div>
                        <div className={styles.formItem}>
                            <label htmlFor="vehicle">Veiculo</label>
                            {vehiclesError ? <span>Error</span> : (<select>

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