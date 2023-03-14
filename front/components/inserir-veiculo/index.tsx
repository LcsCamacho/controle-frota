import styles from './style.module.scss';
import { useAddVehicle } from 'hooks/UseAddVehicle';
import { z } from 'zod'
import { useSelector } from 'react-redux';

const plateReg = new RegExp('[a-zA-Z]{3}[-][0-9][a-z0-9A-Z][0-9]{2}')
const VehicleSchema = z.object({
    model: z.string(),
    plate: z.string().length(8).regex(plateReg),
    type: z.string()
})

type VehicleType = z.infer<typeof VehicleSchema>

export default function InserirCarro({refetch}: {refetch: () => any}) {
    const {user} = useSelector((state: any) => state.user)

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        let result = VehicleSchema.safeParse({
            model: event.target.model.value,
            plate: event.target.plate.value,
            type: event.target.type.value,
        })
        if (result.success) {
            const data: VehicleType = result.data
            useAddVehicle(data, user.token).then((res) => {
                if (!res) alert('Erro ao inserir veículo')
                event.target.model.value = ''
                event.target.plate.value = ''
                refetch()
            })
        }
        else {
            alert('Dados inválidos')
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
                    <select name="type" id="type">
                        <option value="Passeio">Passeio</option>
                        <option value="Carga">Carga</option>
                    </select>
                    <button type="submit" >Inserir Carro a Frota</button>
                </div>
            </form>
        </div>
    )
}