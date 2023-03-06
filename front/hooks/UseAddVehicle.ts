
import { Vehicle } from 'types';



export const useAddVehicle = async ({ model, plate, type }: Vehicle) => {
    console.log('Adding vehicle', model, plate, type);
    const response = await fetch(`http://localhost:3000/veiculo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            plate,
            type
        }),
    });
}
