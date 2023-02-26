import { useEffect, useState } from 'react';
import styles from './dashboard.module.scss';
import ListarCarro from 'components/listar-carros';
import InserirCarro from 'components/inserir-carro';
import ListarDisponiveis from './../listar-carros-disponiveis/index';

type Car = {
    id: Number,
    model: String,
    plate: String,
    avaliable: Boolean,
}

export default function DashboardCar() {
    const [listarCarro, setListarCarro] = useState(false);
    const [listarCarroDisp, setListarCarroDisp] = useState(false);
    const [listarCarroIndisp, setListarCarroIndisp] = useState(false);
    const [inserirCarro, setInserirCarro] = useState(false);

    return (
        <>
            <div className={styles.dashboardCarContainer}>
                <div className={styles.dashboardCarContent}>
                    <nav>
                        <h1 onClick={()=> setListarCarro(!listarCarro)}>Listar Todos Carros</h1>
                        <h1 onClick={()=> setListarCarroDisp(!listarCarroDisp)}>Listar Disponíveis</h1>
                        <h1 onClick={()=> setListarCarroIndisp(!listarCarroIndisp)}>Listar Indisponíveis</h1>
                        <h1 onClick={()=> setInserirCarro(!inserirCarro)}>Adicionar Carro</h1>
                    </nav>
                    {inserirCarro && < InserirCarro />}
                    {listarCarroDisp && <ListarDisponiveis />}
                    {listarCarro && <ListarCarro />}
                    {listarCarroIndisp && <span>Carro Indisp</span>}

                </div>
            </div>
        </>
    )
}