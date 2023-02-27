
import InserirMotorista from 'components/inserir-motorista';
import ListarMotoristas from 'components/listar-motoristas';
import ListarMotoristasDisponiveis from 'components/listar-motoristas-disponiveis';
import ListarMotoristasIndisponiveis from 'components/listar-motoristas-indisponiveis';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Driver, reduxUsuario } from 'types';
import styles from './dashboard.module.scss';
import { Chart } from 'react-google-charts';



export default function DashboardMotorista() {
    const { user } = useSelector((state: reduxUsuario) => state.user);

    const [listarMotorista, setListarMotorista] = useState(false);
    const [listarMotoristaDisp, setListarMotoristaDisp] = useState(false);
    const [listarMotoristaIndisp, setListarMotoristaIndisp] = useState(false);
    const [inserirMotorista, setInserirMotorista] = useState(false);

    const [listaMotorista, setListaMotorista] = useState<Driver[]>([]);
    const [listaMotoristaDisp, setListaMotoristaDisp] = useState<Driver[]>([]);
    const [listaMotoristaIndisp, setListaMotoristaIndisp] = useState<Driver[]>([]);


    const fetchs = async () => {
        const [motoristas, mtIndisponiveis, mtDisponiveis] = await Promise.all([
            fetch('http://localhost:3000/motorista'),
            fetch('http://localhost:3000/motoristas-disp'),
            fetch('http://localhost:3000/motoristas-indisp')
        ]);
        const [motoristasJson, mtIndisponiveisJson, mtDisponiveisJson] = await Promise.all([
            motoristas.json(),
            mtIndisponiveis.json(),
            mtDisponiveis.json()
        ]);
        setListaMotorista(motoristasJson);
        setListaMotoristaDisp(mtIndisponiveisJson);
        setListaMotoristaIndisp(mtDisponiveisJson);
    }


    useEffect(() => {
        fetchs()
    }, []);





    return (
        <>
            <div className={styles.dashboardMotoristaContainer}>
                <h1>Motoristas</h1>
                <div className={styles.dashboardMotoristaContent}>
                    <nav>
                        <h1 onClick={() => setListarMotorista(!listarMotorista)}>Listar Todos Motoristas</h1>
                        <h1 onClick={() => setListarMotoristaDisp(!listarMotoristaDisp)}>Listar Disponíveis</h1>
                        <h1 onClick={() => setListarMotoristaIndisp(!listarMotoristaIndisp)}>Listar Indisponíveis</h1>
                        {user.management && <h1 onClick={() => setInserirMotorista(!inserirMotorista)}>Adicionar Motorista</h1>}
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
                                                    setListarMotoristaDisp(!listarMotoristaDisp);
                                                } else {
                                                    setListarMotoristaIndisp(!listarMotoristaIndisp);
                                                }
                                            }
                                        }
                                    ]}
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Status', 'Quantidade'],
                                        ['Disponível', listaMotoristaDisp.length],
                                        ['Indisponível', listaMotoristaIndisp.length],
                                    ]}
                                    options={{
                                        title: 'Status dos Motoristas',
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
                                <span>Quantidade de motoristas total : {listaMotorista.length}</span>
                                <span>Quantidade de motoristas disponíveis : {listaMotoristaDisp.length}</span>
                                <span>Quantidade de motoristas indisponíveis : {listaMotoristaIndisp.length}</span>
                            </div>

                            {/* 
                            <p>Disponível: Motorista está disponível para realizar uma viagem.</p>
                            <p>Indisponível: Motorista está indisponível para realizar uma viagem.</p>
                            <p>Esta página é responsável por listar todos os motoristas cadastrados no sistema, além de permitir a inserção de novos motoristas.</p>
                            <p>Para inserir um novo motorista, basta clicar no botão "Adicionar Motorista" e preencher os campos com as informações do motorista.</p>
                            <p>Para listar todos os motoristas, basta clicar no botão "Listar Todos Motoristas".</p>
                            <p>Para listar os motoristas disponíveis, basta clicar no botão "Listar Disponíveis".</p>
                            <p>Para listar os motoristas indisponíveis, basta clicar no botão "Listar Indisponíveis".</p> */}

                        </div>
                    </div>
                    {inserirMotorista && < InserirMotorista />}
                    {listarMotoristaDisp && <ListarMotoristasDisponiveis />}
                    {listarMotorista && <ListarMotoristas />}
                    {listarMotoristaIndisp && <ListarMotoristasIndisponiveis />}

                </div>
            </div>
        </>
    )
}