
import InserirMotorista from 'components/inserir-motorista';
import ListarMotoristas from 'components/listar-motoristas';
import ListarMotoristasDisponiveis from 'components/listar-motoristas-disponiveis';
import ListarMotoristasIndisponiveis from 'components/listar-motoristas-indisponiveis';
import { useToggleColor } from 'hooks/UseToogleColor';
import { useState } from 'react';
import { Chart } from 'react-google-charts';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { reduxUsuario } from 'types';
import styles from './dashboard.module.scss';



export default function DashboardMotorista() {
    const { user } = useSelector((state: reduxUsuario) => state.user);

    const [listarMotorista, setListarMotorista] = useState(false);
    const [listarMotoristaDisp, setListarMotoristaDisp] = useState(false);
    const [listarMotoristaIndisp, setListarMotoristaIndisp] = useState(false);
    const [inserirMotorista, setInserirMotorista] = useState(false);
    const [showHowUse, setShowHowUse] = useState(false);

    const fetchs = async () => {
        const [motoristas, mtIndisponiveis, mtDisponiveis] = await Promise.all([
            fetch('http://localhost:3000/motorista'),
            fetch('http://localhost:3000/motoristas-disp'),
            fetch('http://localhost:3000/motoristas-indisp')
        ]);
        const [listaMotorista, listaMotoristaDisp, listaMotoristaIndisp] = await Promise.all([
            motoristas.json(),
            mtIndisponiveis.json(),
            mtDisponiveis.json()
        ]);
        return { listaMotorista, listaMotoristaDisp, listaMotoristaIndisp }

    }
    let arr = ['', '', '']

    let queryOptions = { retry: 5, refetchOnWindowFocus: true, refetchInterval: 5000, initialState: arr }

    const { data, isLoading, isError, refetch } = useQuery('listDriver', fetchs, queryOptions)

    if (isError) {
        return <h1>Error...</h1>
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        data !== undefined ?
            <>
                <div className={styles.dashboardMotoristaContainer}>
                    <h1>Ve??culos</h1>

                    <div className={styles.header}>
                        <div className={styles.howUse}>
                            <h3 onClick={() => setShowHowUse(!showHowUse)}>Como Usar {showHowUse ? '?' : '+'}</h3>
                            {showHowUse && <div className={styles.howUseContent}>
                                <p>Dispon??vel: Motorista est?? dispon??vel para realizar uma viagem.</p>
                                <p>Indispon??vel: Motorista est?? indispon??vel para realizar uma viagem.</p>
                                {user.management && (<><p>Esta p??gina ?? respons??vel por listar todos os motoristas cadastrados no sistema, al??m de permitir a inser????o de novos motoristas.</p>
                                 <p>Para inserir um novo motorista, basta clicar no bot??o "Adicionar Motorista" 
                                    e preencher os campos com as informa????es do motorista.</p></>)}
                                <p>Para listar todos os motoristas, basta clicar no bot??o "Listar Todos Motoristas".</p>
                                <p>Para listar os motoristas dispon??veis, basta clicar no bot??o "Listar Dispon??veis".</p>
                                <p>Para listar os motoristas indispon??veis, basta clicar no bot??o "Listar Indispon??veis".</p> 
                            </div>}
                        </div>
                    </div>

                    <div className={styles.dashboardMotoristaContent}>
                        <nav>
                            <h1 onClick={() => setListarMotorista(!listarMotorista)}
                                style={useToggleColor(listarMotorista)}>Listar Todos Motoristas</h1>

                            <h1 onClick={() => setListarMotoristaDisp(!listarMotoristaDisp)}
                                style={useToggleColor(listarMotoristaDisp)}>Listar Dispon??veis</h1>

                            <h1 onClick={() => setListarMotoristaIndisp(!listarMotoristaIndisp)}
                                style={useToggleColor(listarMotoristaIndisp)}>Listar Indispon??veis</h1>

                            {user.management && <h1 onClick={() => setInserirMotorista(!inserirMotorista)}
                                style={useToggleColor(inserirMotorista)}>Adicionar Motorista</h1>}
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
                                                    if (status === 'Dispon??vel') {
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
                                            ['Dispon??vel', data.listaMotoristaDisp === undefined ? 0 : data.listaMotoristaDisp.length],
                                            ['Indispon??vel', data.listaMotoristaIndisp === undefined ? 0 : data.listaMotoristaIndisp.length],
                                        ]}
                                        options={{
                                            title: 'Status dos Motoristas',
                                            is3D: true,
                                            legend: {
                                                position: 'bottom',
                                                alignment: 'center',
                                                textStyle: {
                                                    color: '#233238',
                                                    fontSize: 14
                                                }
                                            }

                                        }}
                                    />
                                </div>
                                <div className={styles.descText}>
                                    <span>Quantidade de motoristas total : {data.listaMotorista === undefined ? 0 : data.listaMotorista.length}</span>
                                    <span>Quantidade de motoristas dispon??veis : {data.listaMotoristaDisp === undefined ? 0 : data.listaMotoristaDisp.length}</span>
                                    <span>Quantidade de motoristas indispon??veis : {data.listaMotoristaIndisp === undefined ? 0 : data.listaMotoristaIndisp.length}</span>
                                </div>


                            </div>
                        </div>
                        {inserirMotorista && < InserirMotorista refetch={refetch}/>}
                        {data.listaMotoristaDisp !== undefined && listarMotoristaDisp && <ListarMotoristasDisponiveis driverListDisp={data.listaMotoristaDisp} refetch={refetch}/>}
                        {listarMotorista && <ListarMotoristas driverList={data.listaMotorista} refetch={refetch} />}
                        {listarMotoristaIndisp && <ListarMotoristasIndisponiveis driverListIndisp={data.listaMotoristaIndisp} refetch={refetch}/>}

                    </div>
                </div>
            </>
            : <h1>Loading...</h1>)
}