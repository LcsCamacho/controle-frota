import { useState } from "react";
import { Driver } from "types";


export const useAddDriver = (driver: Driver) => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const addDriver = async (driver: Driver) => {
        const response = await fetch(`http://localhost:3000/motorista`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(driver),
        });
        return await response.json();
    };
    addDriver(driver).then((res: Driver[]) => setDrivers(res))
    return { drivers };
}
