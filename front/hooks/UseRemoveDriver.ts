
export const useRemoveDriver = () => {
    
    const removeDriver = async (id: string) => {
        await fetch(`http://localhost:3000/motorista/${id}`, {
            method: 'DELETE',
        });
    };

    return { removeDriver };
}