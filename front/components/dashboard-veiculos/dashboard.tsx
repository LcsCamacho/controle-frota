import InserirVeiculo from 'components/inserir-veiculo';
import ListarVeiculos from 'components/listar-veiculos';
import ListarIndisponiveis from 'components/listar-veiculos-indisponiveis';
import ListarDisponiveis from '../listar-veiculos-disponiveis/index';
import styles from './dashboard.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Vehicle, reduxUsuario } from 'types';
import Chart from 'react-google-charts';


export default function DashboardVehicle() {
    const { user } = useSelector((state: reduxUsuario) => state.user);
    const [listaVeiculosDisp, setlistaVeiculosDisp] = useState<Vehicle[]>([]);
    const [listaVeiculosIndisp, setlistaVeiculosIndisp] = useState<Vehicle[]>([]);
    const [listaVeiculos, setlistaVeiculos] = useState<Vehicle[]>([]);

    const [listarVeiculos, setListarVeiculos] = useState(false);
    const [listarVeiculosDisp, setListarVeiculossDisp] = useState(false);
    const [listarVeiculosIndisp, setListarVeiculossIndisp] = useState(false);
    const [inserirVeiculo, setInserirVeiculo] = useState(false);

    const fetchs = async () => {
        const [veiculos, veiculoDisponivel, veiculoIndisponivel] = await Promise.all([
            fetch('http://localhost:3000/veiculo'),
            fetch('http://localhost:3000/veiculo-disp'),
            fetch('http://localhost:3000/veiculo-indisp')
        ]);
        const [veiculosJson, veiculoDisponivelJson, veiculoIndisponivelJson] = await Promise.all([
            veiculos.json(),
            veiculoDisponivel.json(),
            veiculoIndisponivel.json()
        ]);
        setlistaVeiculos(veiculosJson);
        setlistaVeiculosDisp(veiculoDisponivelJson);
        setlistaVeiculosIndisp(veiculoIndisponivelJson);
    }


    useEffect(() => {
        fetchs()
    }, []);

    return (
        <>
            <div className={styles.dashboardVehicleContainer}>
                <h1>Veiculos</h1>
                <div className={styles.dashboardVehicleContent}>
                    <nav>
                        <h1 onClick={() => setListarVeiculos(!listarVeiculos)}>Listar Todos Veículos</h1>
                        <h1 onClick={() => setListarVeiculossDisp(!listarVeiculosDisp)}>Listar Disponíveis</h1>
                        <h1 onClick={() => setListarVeiculossIndisp(!listarVeiculosIndisp)}>Listar Indisponíveis</h1>
                        {user.management && <h1 onClick={() => setInserirVeiculo(!inserirVeiculo)}>Adicionar Veículo</h1>}
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
                                                    setListarVeiculossDisp(!listarVeiculosDisp);
                                                } else {
                                                    setListarVeiculossIndisp(!listarVeiculosIndisp);
                                                }
                                            }
                                        }
                                    ]}
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Status', 'Quantidade'],
                                        ['Disponível', listaVeiculosDisp.length],
                                        ['Indisponível', listaVeiculosIndisp.length],
                                    ]}
                                    options={{
                                        title: 'Status dos veiculos',
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
                                <span>Quantidade de veiculos total : {listaVeiculos.length}</span>
                                <span>Quantidade de veiculos disponíveis : {listaVeiculosDisp.length}</span>
                                <span>Quantidade de veiculos indisponíveis : {listaVeiculosIndisp.length}</span>
                            </div>

                            {/* 
                            <p>Disponível: veiculos está disponível para realizar uma viagem.</p>
                            <p>Indisponível: veiculos está indisponível para realizar uma viagem.</p>
                            <p>Esta página é responsável por listar todos os veiculos cadastrados no sistema, além de permitir a inserção de novos veiculos.</p>
                            <p>Para inserir um novo veiculos, basta clicar no botão "Adicionar veiculos" e preencher os campos com as informações do veiculos.</p>
                            <p>Para listar todos os veiculos, basta clicar no botão "Listar Todos veiculos".</p>
                            <p>Para listar os veiculos disponíveis, basta clicar no botão "Listar Disponíveis".</p>
                            <p>Para listar os veiculos indisponíveis, basta clicar no botão "Listar Indisponíveis".</p> */}

                        </div>
                    </div>
                    {user.management && inserirVeiculo && < InserirVeiculo />}
                    {listarVeiculosDisp && <ListarDisponiveis />}
                    {listarVeiculos && <ListarVeiculos />}
                    {listarVeiculosIndisp && <ListarIndisponiveis />}
                </div>
            </div>
        </>
    )
}