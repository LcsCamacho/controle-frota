export const useRemoveDriver = () => {
    
    const removeDriver = async (id: string, token:string) => {
        await fetch(`http://localhost:3000/motorista/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
    };

    return { removeDriver };
}