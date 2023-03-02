import { useState, useEffect } from "react";
import { Vehicle } from "types";

export const useListVehicle = async () => {

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const listVehicle = async () => {
        const response = await fetch(`http://localhost:3000/veiculo`);
        return await response.json();
    };

    listVehicle().then(
        (res:Vehicle[])=>{
            setVehicles(res)
        }
    )

    return { vehicles };
}