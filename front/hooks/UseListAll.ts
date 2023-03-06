import { useState } from "react";
import { Vehicle, Driver, Maintenance } from "types";


export const useListAll = async () => {
    const [listaVeiculos, setlistaVeiculos] = useState<Vehicle[]>([]);
    const [ListaMotoristas, setListarMotoristas] = useState<Driver[]>([]);
    const [listaManutencoes, setListaManutencoes] = useState<Maintenance[]>([]);

    const [veiculos, motoristas, manutencoes ] = await Promise.all([
        fetch('http://localhost:3000/veiculo'),
        fetch('http://localhost:3000/motorista'),
        fetch('http://localhost:3000/manutencao')
    ]);
    const [veiculosJson, motoristasJson, manutencoeslJson] = await Promise.all([
        veiculos.json(),
        motoristas.json(),
        manutencoes.json()
  
    ]);
    setlistaVeiculos(veiculosJson);
    setListarMotoristas(motoristasJson);
    setListaManutencoes(manutencoeslJson);

    return { listaVeiculos, ListaMotoristas, listaManutencoes };

}