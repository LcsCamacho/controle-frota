import { Vehicle } from 'types';

export const useAddVehicle = async ({ model, plate, type }: Vehicle, token:string) => {
    const response = await fetch(`http://localhost:3000/veiculo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({
            model,
            plate,
            type
        }),
    });
    if(response.status === 500) {
        alert("erro")
    }else {
        const data = await response.json();
        return data;
    }
}
