
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { reduxUsuario, Vehicle } from 'types';
import styles from './dashboard.module.scss';
import ListarManutencao from 'components/listar-manutencoes';
import Chart from 'react-google-charts';
import InserirManutencao from 'components/inserir-manutencao';

export default function DashboardManutencao() {
    const { user } = useSelector((state: reduxUsuario) => state.user);
    const [listaManutencao, setListaManutencao] = useState([]);
    const [listaVeiculos, setListaVeiculos] = useState<Vehicle[]>([]);
    const [listaVeiculosPasseio, setListaVeiculosPasseio] = useState<Vehicle[]>([]);
    const [listaVeiculosPesado, setListaVeiculosPesado] = useState<Vehicle[]>([]);
    const [listarManutencao, setListarManutencao] = useState(false);
    const [inserirManutencao, setInserirManutencao] = useState(false);


    const procuraTiposVeiculos = () => {
        const veiculosPasseio = listaVeiculos.filter((veiculo) => veiculo.type.toLowerCase() === 'passeio');
        const veiculosPesado = listaVeiculos.filter((veiculo) => veiculo.type.toLowerCase() === 'pesado');
        setListaVeiculosPasseio(veiculosPasseio);
        setListaVeiculosPesado(veiculosPesado);
    }


    const fetchs = async () => {
        const [manutencao, veiculos] = await Promise.all([
            fetch('http://localhost:3000/manutencao', { cache: 'default' }),
            fetch('http://localhost:3000/veiculo', { cache: 'default' })

        ]);
        const [manutencaoJson, veiculosJson] = await Promise.all([
            manutencao.json(),
            veiculos.json()

        ]);
        setListaManutencao(manutencaoJson);
        setListaVeiculos(veiculosJson);
    }


    useEffect(() => {
        procuraTiposVeiculos();
    }, [listaVeiculos]);



    useEffect(() => {
        fetchs()
    }, []);


    return (
        <>
            <div className={styles.dashboardManutencaoContainer}>
                <h1>Manutenções</h1>
                <div className={styles.dashboardManutencaoContent}>
                    <nav>
                        <h1 onClick={() => setListarManutencao(!listarManutencao)}>Listar Relatório de Manutençao</h1>
                        {user.management && <h1 onClick={() => setInserirManutencao(!inserirManutencao)}>Inserir Veiculo à Manutenção</h1>}
                    </nav>
                    <div className={styles.descContainer}>
                        <div className={styles.descContent}>
                            <h1>Status</h1>
                            <div className={styles.chart}>
                                <Chart
                                    legendToggle
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    chartEvents={[
                                        {
                                            eventName: 'select',
                                            callback: ({ chartWrapper }) => {
                                                const chart = chartWrapper.getChart();
                                                const selection = chart.getSelection();
                                                if (selection.length === 0) return;
                                                const [selectedItem] = selection;
                                                const { row } = selectedItem;
                                                const tipo = chartWrapper.getDataTable()?.getValue(row, 0);
                                                console.log(tipo);
                                            },
                                        },
                                    ]}
                                    data={[
                                        ['tipos', 'quantidade'],
                                        ['Pesado', listaVeiculosPesado.length],
                                        ['Passeio', listaVeiculosPasseio.length],
                                    ]}
                                    options={{
                                        title: 'Manutenções',
                                        // Just add this option
                                        is3D: true,
                                        legend: {
                                            position: 'bottom',
                                            alignment: 'center',
                                            textStyle: {
                                                fontSize: 14
                                            }
                                        }
                                    }}
                                />

                            </div>
                            <div className={styles.descText}>
                                    <span>Veiculos Pesados em manutenção : {listaVeiculosPesado.length}</span>
                                    <span>Veiculos de Passeio em manutenção : {listaVeiculosPasseio.length}</span>
                                    <span>Veiculos totais em Manutenção : {listaVeiculosPasseio.length + listaVeiculosPesado.length}</span>
                            </div>

                        </div>
                    </div>
                    <div className={styles.dados}>
                        {inserirManutencao && <InserirManutencao />}
                        {listarManutencao && <ListarManutencao />}
                    </div>
                </div>
            </div>
        </>
    )
}