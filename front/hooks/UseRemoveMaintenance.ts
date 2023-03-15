
export const useRemoveMaintenance = () => {

    const removeMaintenance = async (id: string) => {
        const response = await fetch(`http://localhost:3000/manutencao/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        return data;
    }

    return { removeMaintenance };
}