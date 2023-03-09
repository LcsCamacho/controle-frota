import { useState, useEffect } from "react"
import { Vehicle } from "types"

export const useListVehiclesInMaintenance = () => {
    const [vehiclesInMaintenance, setVehiclesInMaintenance] = useState<Vehicle[]>([])
    const [loading, setLoading] = useState(true)

    const fetchVehiclesInMaintenance = async () => {
        fetch('http://localhost:3000/veiculos-manutencao')
            .then((response) => {
               response.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })

            return {vehiclesInMaintenance}
    }

    return { fetchVehiclesInMaintenance, loading }
}