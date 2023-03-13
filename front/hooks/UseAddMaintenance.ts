import { Maintenance } from "types";

export const useAddMaintenance = () => {
    const addMaintenance = async (maintenance: Maintenance) => {
        await fetch(`http://localhost:3000/manutencao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(maintenance),
        });
    };

    return { addMaintenance };
}