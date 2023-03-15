import { Vehicle } from 'types';

export const useAddVehicle = async ({ model, plate, type }: Vehicle, token:string) => {

    console.log('Adding vehicle', model, plate, type);
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
        alert("AI AI AI")
    }else {
        const data = await response.json();
        console.log('Vehicle added', data);
        return data;
    }
}
