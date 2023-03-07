
import { Driver } from "types";


export const useAddDriver = async (driver: Driver) => {
    console.log('Adding driver', driver);
    await fetch(`http://localhost:3000/motorista`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
    });
}
