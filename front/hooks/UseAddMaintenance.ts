import { Maintenance } from "types";

export const useAddMaintenance = (maintenance: Maintenance) => {
    const addMaintenance = async (maintenance: Maintenance) => {
        await fetch(`http://localhost:3000/manutencao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(maintenance),
        });
    };

   addMaintenance(maintenance).then(() => {alert('Inserido com sucesso')});
}