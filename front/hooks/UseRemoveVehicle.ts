export const useRemoveVehicle = () => {

    const removeVehicle = async (id: string, token:string) => {
        await fetch(`http://localhost:3000/veiculo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
    };

    return { removeVehicle };
}
