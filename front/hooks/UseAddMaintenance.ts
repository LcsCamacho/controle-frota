import { Maintenance } from "types";

export const useAddMaintenance = () => {

    const addMaintenance = async (maintenance: Maintenance, token:string) => {
        const response = await fetch(`http://localhost:3000/manutencao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(maintenance),
        });
        const data = await response.json();
        console.log('Maintenance added', data);
        return data;

    };

    return { addMaintenance };
}