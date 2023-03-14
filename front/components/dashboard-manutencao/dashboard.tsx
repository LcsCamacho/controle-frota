import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { reduxUsuario, Vehicle, Maintenance } from 'types';
import styles from './dashboard.module.scss';
import ListarManutencao from 'components/listar-manutencoes';
import Chart from 'react-google-charts';
import InserirManutencao from 'components/inserir-manutencao';
import { useQuery } from 'react-query';
import FinalizarManutencao from 'components/finalizar-manutencao';
import { useToggleColor } from 'hooks/UseToogleColor';
import ChartModelPie from 'components/Charts/ChartModelPie';

export default function DashboardManutencao() {
    const { user } = useSelector((state: reduxUsuario) => state.user);
    const [listaManutencao, setListaManutencao] = useState<Maintenance[]>([]);
    const [listaVeiculos, setListaVeiculos] = useState<Vehicle[]>([]);
    const [listaVeiculosEmManutencao, setListaVeiculosEmManutencao] = useState<Vehicle[]>([]);
    const [listaVeiculosPasseio, setListaVeiculosPasseio] = useState<Vehicle[]>([]);
    const [listaVeiculosPesado, setListaVeiculosPesado] = useState<Vehicle[]>([]);

    const [listarManutencao, setListarManutencao] = useState(false);
    const [inserirManutencao, setInserirManutencao] = useState(false);
    const [finalizarManutencao, setFinalizarManutencao] = useState(false);
    const [showHowUse, setShowHowUse] = useState(false);

    const procuraTiposVeiculos = () => {
        const veiculosPasseio = listaVeiculosEmManutencao.filter(
            (veiculo) => veiculo.type.toLowerCase() === 'passeio');
        const veiculosPesado = listaVeiculosEmManutencao.filter(
            (veiculo) => veiculo.type.toLowerCase() === 'pesado');
        setListaVeiculosPasseio(veiculosPasseio);
        setListaVeiculosPesado(veiculosPesado);
    }

    const fetchs = async () => {
        const [manutencao, veiculos, veiculosEmManutencao] = await Promise.all([
            fetch('http://localhost:3000/manutencao'),
            fetch('http://localhost:3000/veiculo'),
            fetch('http://localhost:3000/veiculos-manutencao')
        ]);
        const [manutencaoJson, veiculosJson, veiculosEmManutencaoJson] = await Promise.all([
            manutencao.json(),
            veiculos.json(),
            veiculosEmManutencao.json()
        ]);
        let x = manutencaoJson.filter((maintenance: any) => maintenance.checkout === null);
        setListaManutencao(x);
        setListaVeiculos(veiculosJson);
        setListaVeiculosEmManutencao(veiculosEmManutencaoJson);
    }

    useEffect(() => {
        procuraTiposVeiculos();
    }, [listaVeiculosEmManutencao]);


    let queryOptions = { retry: 2, refetchOnWindowFocus: true, refetchInterval: 5000 }

    const {isError, isLoading} = useQuery('manutencao', fetchs, queryOptions)

    if(isLoading) return <h1>Carregando...</h1>
    if(isError) return <h1>Erro ao carregar</h1>

    return (
        <>
            <div className={styles.dashboardManutencaoContainer}>
                <h1>Manutenções</h1>

                <div className={styles.header}>
                        <div className={styles.howUse}>
                            <h3 onClick={() => setShowHowUse(!showHowUse)}>Como Usar {showHowUse ? '?' : '+'}</h3>
                            {showHowUse && <div className={styles.howUseContent}>
                            <hr />
                                <p><b>Em andamento:</b> manutenção está em andamento .</p>
                                <p><b>Finalizada:</b> manutenção está finalizada.</p>
                                <hr />
                                {user.management && (<><p>Esta página é responsável por listar todos as manutenção cadastradas no sistema, 
                                    além de permitir a inserção de novas manutenções.</p>
                                 <p>Para inserir uma nova manutenção, basta clicar no botão "Adicionar Manutenção" 
                                    e preencher os campos com as informações da manutenção.</p></>)}
                                <p>Para listar todas as manutenções em andamento, basta clicar no botão "Listar Relatório de Manutenção".</p>
                                <p>Para listar todas as manutenções, basta clicar no botão "Listar Relatório Geral".</p>
                            </div>}
                        </div>
                    </div>
                    
                <div className={styles.dashboardManutencaoContent}>
                    <nav>
                        <h1 onClick={() => setListarManutencao(!listarManutencao)}
                        style={useToggleColor(listarManutencao)}>Listar Relatório de Manutençao</h1>
                        <h1 onClick={() => setFinalizarManutencao(!finalizarManutencao)}
                        style={useToggleColor(finalizarManutencao)}>Finalizar Manutençao</h1>
                        {user.management && <h1 onClick={() => setInserirManutencao(!inserirManutencao)}
                        style={useToggleColor(inserirManutencao)}>Inserir Veiculo à Manutenção</h1>}
                    </nav>
                    <div className={styles.descContainer}>
                        <div className={styles.descContent}>
                            <h1>Status</h1>
                            <div className={styles.chart}>
                                <ChartModelPie
                                    strChartType="PieChart"
                                    data={[
                                        ['tipos', 'quantidade'],
                                        ['Disponiveis', listaVeiculos.filter((veiculo) => veiculo.avaliable).length - listaVeiculosEmManutencao.length],
                                        ['Em manutenção', listaVeiculosEmManutencao.length],
                                    ]}
                                    title={'Veiculos em manutenção'}
                                />
                               { listaVeiculosEmManutencao.length > 0 && <ChartModelPie
                                    strChartType="PieChart"
                                    data={[
                                        ['tipos', 'quantidade'],
                                        ['Pesado', listaVeiculosPesado.length],
                                        ['Passeio', listaVeiculosPasseio.length],
                                    ]} 
                                    title={'Tipos de veiculos em manutenção'}                                
                                    />}
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
                        {finalizarManutencao && <FinalizarManutencao />}
                    </div>
                </div>
            </div>
        </>
    )
}