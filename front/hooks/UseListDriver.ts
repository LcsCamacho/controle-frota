import { useState, useEffect } from "react";
import { Driver } from "types";

export const useListDriver = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const listDriver = async () => {
        const response = await fetch(`http://localhost:3000/motorista`);
        return await response.json();
    };
    useEffect(() => {
        listDriver()
        .then((response) => {
            setDrivers(response);
        });
    }, []);
    return { drivers };
}