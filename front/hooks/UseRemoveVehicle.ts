
export const useRemoveVehicle = () => {

    const removeVehicle = async (id: string) => {
        await fetch(`http://localhost:3000/veiculo/${id}`, {
            method: 'DELETE',
        });
    };

    return { removeVehicle };
}
