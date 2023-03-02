
import { Vehicle } from 'types';

export const useAddVehicle = (vehicle: Vehicle) => {

    const addVehicle = async ({ model, plate, type }: Vehicle) => {
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
    return { addVehicle }
}