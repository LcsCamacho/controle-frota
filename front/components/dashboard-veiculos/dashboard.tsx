import InserirVeiculo from 'components/inserir-veiculo';
import ListarVeiculos from 'components/listar-veiculos';
import ListarIndisponiveis from 'components/listar-veiculos-indisponiveis';
import { useState } from 'react';
import Chart from 'react-google-charts';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { reduxUsuario } from 'types';
import ListarDisponiveis from 'components/listar-veiculos-disponiveis';
import styles from './dashboard.module.scss';
import { setVeiculos } from 'features/redux/vehicle-slice';
import { useToggleColor } from 'hooks/UseToogleColor';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineVisibility } from 'react-icons/md';


export default function DashboardVehicle() {
    const { user } = useSelector((state: reduxUsuario) => state.user);
    const dispatch = useDispatch();

    const [listarVeiculos, setListarVeiculos] = useState(false);
    const [listarVeiculosDisp, setListarVeiculossDisp] = useState(false);
    const [listarVeiculosIndisp, setListarVeiculossIndisp] = useState(false);
    const [inserirVeiculo, setInserirVeiculo] = useState(false);
    const [showHowUse, setShowHowUse] = useState(false);


    const fetchs = async () => {
        const [veiculos, veiculoDisponivel, veiculoIndisponivel] = await Promise.all([
            fetch('http://localhost:3000/veiculo'),
            fetch('http://localhost:3000/veiculo-disp'),
            fetch('http://localhost:3000/veiculo-indisp')
        ]);
        const [listaVeiculos, listaVeiculosDisp, listaVeiculosIndisp] = await Promise.all([
            veiculos.json(),
            veiculoDisponivel.json(),
            veiculoIndisponivel.json()
        ]);
        dispatch(setVeiculos(listaVeiculos))
        return { listaVeiculos, listaVeiculosDisp, listaVeiculosIndisp }
    }
    let arr = ['', '', '', '']


    let queryOptions = { retry: 5, refetchOnWindowFocus: true, refetchInterval: 5000, initialState: arr }

    const { data, isLoading, isError, refetch } = useQuery('listVehicle', fetchs, queryOptions)

    if (isError) {
        return <h1>Error...</h1>
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        data !== undefined ?
            <>
                <div className={styles.dashboardVehicleContainer}>
                    <h1>Ve??culos</h1>

                    <div className={styles.header}>
                        <div className={styles.howUse}>
                            <h3 onClick={() => setShowHowUse(!showHowUse)}>Como Usar {showHowUse ? '?' : '+'}</h3>
                            {showHowUse && <div className={styles.howUseContent}>
                                <p>Dispon??vel: veiculos est?? dispon??vel para realizar uma viagem.</p>
                                <p>Indispon??vel: veiculos est?? indispon??vel para realizar uma viagem.</p>
                                {user.management && (<><p>Esta p??gina ?? respons??vel por listar todos os veiculos cadastrados no sistema, 
                                    al??m de permitir a inser????o de novos veiculos.</p>
                                <p>Para inserir um novo veiculos, basta clicar no bot??o "Adicionar veiculo" e preencher os campos com as informa????es do veiculos.</p></>)}
                                <p>Para listar todos os veiculos, basta clicar no bot??o "Listar Todos veiculos".</p>
                                <p>Para listar os veiculos dispon??veis, basta clicar no bot??o "Listar Dispon??veis".</p>
                                <p>Para listar os veiculos indispon??veis, basta clicar no bot??o "Listar Indispon??veis".</p>
                            </div>}
                        </div>
                    </div>

                    <div className={styles.dashboardVehicleContent}>
                        <nav>
                            <h1 onClick={() => setListarVeiculos(!listarVeiculos)}
                                style={useToggleColor(listarVeiculos)}>Listar Todos Ve??culos</h1>
                            <h1 onClick={() => setListarVeiculossDisp(!listarVeiculosDisp)}
                                style={useToggleColor(listarVeiculosDisp)}>Listar Dispon??veis</h1>
                            <h1 onClick={() => setListarVeiculossIndisp(!listarVeiculosIndisp)}
                                style={useToggleColor(listarVeiculosIndisp)}>Listar Indispon??veis</h1>
                            {user.management && <h1 onClick={() => setInserirVeiculo(!inserirVeiculo)}
                                style={useToggleColor(inserirVeiculo)}>Adicionar Ve??culo</h1>}
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
                                            ['Dispon??vel', data.listaVeiculosDisp === undefined ? 0 : data.listaVeiculosDisp.length],
                                            ['Indispon??vel', data.listaVeiculosIndisp === undefined ? 0 : data.listaVeiculosIndisp.length],
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
                                    <span>Quantidade de veiculos total : {data.listaVeiculos === undefined ? 0 : data.listaVeiculos.length}</span>
                                    <span>Quantidade de veiculos dispon??veis : {data.listaVeiculosDisp === undefined ? 0 : data.listaVeiculosDisp.length}</span>
                                    <span>Quantidade de veiculos indispon??veis : {data.listaVeiculosIndisp === undefined ? 0 : data.listaVeiculosIndisp.length}</span>
                                </div>



                            </div>
                        </div>
                        {user.management && inserirVeiculo && < InserirVeiculo refetch={refetch}/>}
                        {listarVeiculosDisp && <ListarDisponiveis vehiclesListDisp={data.listaVeiculosDisp} refetch={refetch} />}
                        {listarVeiculos && <ListarVeiculos vehiclesList={data.listaVeiculos} refetch={refetch} />}
                        {listarVeiculosIndisp && <ListarIndisponiveis vehiclesListIndisp={data.listaVeiculosIndisp} refetch={refetch} />}
                    </div>
                </div>
            </>
            : <h1>Carregando...</h1>
    )
}