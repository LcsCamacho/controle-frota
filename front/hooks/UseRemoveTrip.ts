export const useRemoveTrip = () => {

    const removeTrip = async (id: string, token: string) => {
        await fetch(`http://localhost:3000/viagem/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
    };

    return { removeTrip };
}