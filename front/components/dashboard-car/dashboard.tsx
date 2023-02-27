import InserirCarro from 'components/inserir-carro';
import ListarCarro from 'components/listar-carros';
import ListarIndisponiveis from 'components/listar-carros-indisponiveis';
import ListarDisponiveis from './../listar-carros-disponiveis/index';
import styles from './dashboard.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Car, reduxUsuario } from 'types';
import Chart from 'react-google-charts';


export default function DashboardCar() {
    const {user} = useSelector((state: reduxUsuario) => state.user);
    const [listaCarrosDisp, setListaCarrosDisp] = useState<Car[]>([]);
    const [listaCarrosIndisp, setListaCarrosIndisp] = useState<Car[]>([]);
    const [listaCarros, setListaCarros] = useState<Car[]>([]);

    const [listarCarro, setListarCarro] = useState(false);
    const [listarCarrosDisp, setListarCarrosDisp] = useState(false);
    const [listarCarrosIndisp, setListarCarrosIndisp] = useState(false);
    const [inserirCarro, setInserirCarro] = useState(false);

    const fetchs = async () => {
        const [carros, carIndisp, carDisp] = await Promise.all([
            fetch('http://localhost:3000/carro'),
            fetch('http://localhost:3000/car-disp'),
            fetch('http://localhost:3000/car-indisp')
        ]);
        const [carrosJson, carDispJson, carIndispJson] = await Promise.all([
            carros.json(),
            carIndisp.json(),
            carDisp.json()
        ]);
        setListaCarros(carrosJson);
        setListaCarrosDisp(carDispJson);
        setListaCarrosIndisp(carIndispJson);
    }


    useEffect(() => {
        fetchs()
    }, []);

    return (
        <>
            <div className={styles.dashboardCarContainer}>
                <h1>Carros</h1>
                <div className={styles.dashboardCarContent}>
                    <nav>
                        <h1 onClick={() => setListarCarro(!listarCarro)}>Listar Todos Carros</h1>
                        <h1 onClick={() => setListarCarrosDisp(!listarCarrosDisp)}>Listar Disponíveis</h1>
                        <h1 onClick={() => setListarCarrosIndisp(!listarCarrosIndisp)}>Listar Indisponíveis</h1>
                        {user.management && <h1 onClick={() => setInserirCarro(!inserirCarro)}>Adicionar Carro</h1>}
                    </nav>
                    <div className={styles.descContainer}>
                        <div className={styles.descContent}>
                            <h1>Status</h1>
                            <div className={styles.chart}>
                                <Chart
                                    legendToggle
                                    chartType="PieChart"
                                    chartEvents={[
                                        {
                                            eventName: 'select',
                                            callback: ({ chartWrapper }) => {
                                                const chart = chartWrapper.getChart();
                                                const selection = chart.getSelection();
                                                if (selection.length === 0) return;
                                                const [selectedItem] = selection;
                                                const { row } = selectedItem;
                                                const status = chartWrapper.getDataTable()?.getValue(row, 0);
                                                if (status === 'Disponível') {
                                                    setListarCarrosDisp(!listarCarrosDisp);
                                                } else {
                                                    setListarCarrosIndisp(!listarCarrosIndisp);
                                                }
                                            }
                                        }
                                    ]}
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Status', 'Quantidade'],
                                        ['Disponível', listaCarrosDisp.length],
                                        ['Indisponível', listaCarrosIndisp.length],
                                    ]}
                                    options={{
                                        title: 'Status dos carros',
                                        is3D: true,
                                        legend: {
                                            position: 'bottom',
                                            alignment: 'center',
                                            textStyle: {
                                                color: '233238',
                                                fontSize: 14
                                            }
                                        }

                                    }}
                                />
                            </div>
                            <div className={styles.descText}>
                                <span>Quantidade de carros total : {listaCarros.length}</span>
                                <span>Quantidade de carros disponíveis : {listaCarrosDisp.length}</span>
                                <span>Quantidade de carros indisponíveis : {listaCarrosIndisp.length}</span>
                            </div>

                            {/* 
                            <p>Disponível: Carros está disponível para realizar uma viagem.</p>
                            <p>Indisponível: Carros está indisponível para realizar uma viagem.</p>
                            <p>Esta página é responsável por listar todos os carros cadastrados no sistema, além de permitir a inserção de novos carros.</p>
                            <p>Para inserir um novo Carros, basta clicar no botão "Adicionar Carros" e preencher os campos com as informações do Carros.</p>
                            <p>Para listar todos os carros, basta clicar no botão "Listar Todos carros".</p>
                            <p>Para listar os carros disponíveis, basta clicar no botão "Listar Disponíveis".</p>
                            <p>Para listar os carros indisponíveis, basta clicar no botão "Listar Indisponíveis".</p> */}

                        </div>
                    </div>
                    {user.management && inserirCarro && < InserirCarro />}
                    {listarCarrosDisp && <ListarDisponiveis />}
                    {listarCarro && <ListarCarro />}
                    {listarCarrosIndisp && <ListarIndisponiveis />}
                </div>
            </div>
        </>
    )
}