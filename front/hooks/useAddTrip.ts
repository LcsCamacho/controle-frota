import { InsertTrip } from 'types';

export const useAddTrip = () => {

    const addTrip = async (trip: InsertTrip, token:string) => {
        const response = await fetch(`http://localhost:3000/viagem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(trip),
        });
        const data = await response.json();
        return data;
    };

    return { addTrip };
};