import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { reduxUsuario } from 'types';
import styles from './dashboard.module.scss';
import { useToggleColor } from 'hooks/UseToogleColor';
import InserirVeiculo from '../inserir-veiculo';
import ListarVeiculos from '../listar-veiculos';
import ListarDisponiveis from '../listar-veiculos-disponiveis';
import ListarIndisponiveis from '../listar-veiculos-indisponiveis';
import ChartModelPie from 'components/Charts/ChartModelPie';

export default function DashboardVehicle() {
    const { user } = useSelector((state: reduxUsuario) => state.user);

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
                    <h1>Veículos</h1>

                    <div className={styles.header}>
                        <div className={styles.howUse}>
                            <h3 onClick={() => setShowHowUse(!showHowUse)}>Como Usar {showHowUse ? '?' : '+'}</h3>
                            {showHowUse && <div className={styles.howUseContent}>
                                <hr />
                                <p><b>Disponível: </b>veiculos está disponível para realizar uma viagem.</p>
                                <p><b>Indisponível: </b>veiculos está indisponível para realizar uma viagem.</p>
                                <hr />
                                {user.management && (<><p>Esta página é responsável por listar todos os veiculos cadastrados no sistema,
                                    além de permitir a inserção de novos veiculos.</p>
                                    <p>Para inserir um novo veiculos, basta clicar no botão "Adicionar veiculo" e preencher os campos com as informações do veiculos.</p></>)}
                                <p>Para listar todos os veiculos, basta clicar no botão "Listar Todos veiculos".</p>
                                <p>Para listar os veiculos disponíveis, basta clicar no botão "Listar Disponíveis".</p>
                                <p>Para listar os veiculos indisponíveis, basta clicar no botão "Listar Indisponíveis".</p>
                            </div>}
                        </div>
                    </div>

                    <div className={styles.dashboardVehicleContent}>
                        <nav>
                            <h1 onClick={() => setListarVeiculos(!listarVeiculos)}
                                style={useToggleColor(listarVeiculos)}>Listar Todos Veículos</h1>
                            <h1 onClick={() => setListarVeiculossDisp(!listarVeiculosDisp)}
                                style={useToggleColor(listarVeiculosDisp)}>Listar Disponíveis</h1>
                            <h1 onClick={() => setListarVeiculossIndisp(!listarVeiculosIndisp)}
                                style={useToggleColor(listarVeiculosIndisp)}>Listar Indisponíveis</h1>
                            {user.management && <h1 onClick={() => setInserirVeiculo(!inserirVeiculo)}
                                style={useToggleColor(inserirVeiculo)}>Adicionar Veículo</h1>}
                        </nav>
                        <div className={styles.descContainer}>
                            <div className={styles.descContent}>
                                <h1>Status</h1>
                                <div className={styles.chart}>
                                    <ChartModelPie
                                        data={[
                                            ['Status', 'Quantidade'],
                                            ['Disponível', data.listaVeiculosDisp === undefined ? 0 : data.listaVeiculosDisp.length],
                                            ['Indisponível', data.listaVeiculosIndisp === undefined ? 0 : data.listaVeiculosIndisp.length],
                                        ]}
                                        title={'Status Veiculos'}
                                        strChartType={'PieChart'}
                                    />
                                </div>
                                <div className={styles.descText}>
                                    <span>Quantidade de veiculos total : {data.listaVeiculos === undefined ? 0 : data.listaVeiculos.length}</span>
                                    <span>Quantidade de veiculos disponíveis : {data.listaVeiculosDisp === undefined ? 0 : data.listaVeiculosDisp.length}</span>
                                    <span>Quantidade de veiculos indisponíveis : {data.listaVeiculosIndisp === undefined ? 0 : data.listaVeiculosIndisp.length}</span>
                                </div>
                            </div>
                        </div>
                        {user.management && inserirVeiculo && < InserirVeiculo refetch={refetch} />}
                        {listarVeiculosDisp && <ListarDisponiveis vehiclesListDisp={data.listaVeiculosDisp} refetch={refetch} />}
                        {listarVeiculos && <ListarVeiculos vehiclesList={data.listaVeiculos} refetch={refetch} />}
                        {listarVeiculosIndisp && <ListarIndisponiveis vehiclesListIndisp={data.listaVeiculosIndisp} refetch={refetch} />}
                    </div>
                </div>
            </>
            : <h1>Carregando...</h1>
    )
}