import { vehicleZodType } from "components/manutencoes/inserir-manutencao";

export const useAddMaintenance = () => {

    const addMaintenance = async (maintenance: vehicleZodType, token:string) => {
        const response = await fetch(`http://localhost:3000/manutencao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(maintenance),
        });
        const data = await response.json();
        if(!data.ok) return {error: data.status}
        return data;
    };

    return { addMaintenance };
}