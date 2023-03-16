import { Driver } from "types";

export const useAddDriver = async (driver: Driver, token:string) => {

    const response = await fetch(`http://localhost:3000/motorista`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(driver),
    });

    const data = await response.json();
    return data;
}
