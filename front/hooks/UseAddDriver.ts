import { Driver } from "types";

export const useAddDriver = async (driver: Driver, token:string) => {

    console.log('Adding driver', driver);
    const response = await fetch(`http://localhost:3000/motorista`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(driver),
    });

    const data = await response.json();
    console.log('Driver added', data);
    console.log(token)
    return data;
}
