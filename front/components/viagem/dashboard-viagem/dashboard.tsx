import styles from './dashboard.module.scss';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Trip, reduxUsuario } from 'types';
import { useState, useEffect } from 'react';
import { useToggleColor } from 'hooks/UseToogleColor';
import ChartModelPie from 'components/Charts/ChartModelPie';
import ListarViagem from '../listar-viagem';
import ListarViagensFinalizadas from '../listar-finalizadas';
import ListarViagensAndamento from '../listar-andamento';
import InserirViagem from '../inserir-viagem';
import FinalizarViagem from '../finalizar-viagem';

export default function DashboardViagem() {
    const { user } = useSelector((state: reduxUsuario) => state.user);

    const [listaViagens, setListaViagens] = useState<Trip[]>([]);
    const [listaViagensAndamento, setListaViagensAndamento] = useState<Trip[]>([]);
    const [listaViagensFinalizadas, setListaViagensFinalizadas] = useState<Trip[]>([]);

    const [listaVeiculosAndamentoPasseio, setListaVeiculosAndamentoPasseio] = useState<Trip[]>([]);
    const [listaVeiculosAndamentoPesado, setListaVeiculosAndamentoPesado] = useState<Trip[]>([]);

    const [listarViagens, setListarViagens] = useState(false);
    const [listarViagensFinalizadas, setListarViagensFinalizadas] = useState(false);
    const [listarViagensEmAndamento, setListarViagensEmAndamento] = useState(false);
    const [inserirViagem, setInserirViagem] = useState(false);
    const [finalizarViagem, setFinalizarViagem] = useState(false);
    const [showHowUse, setShowHowUse] = useState(false);


    const procuraViagensAndamento = () => {
        let x = listaViagens.filter((viagem: Trip) => {
            return !viagem.checkOut
        })
        setListaViagensAndamento(x)
    }

    const procuraViagensFinalizadas = () => {
        let x = listaViagens.filter((viagem: Trip) => {
            return viagem.checkOut
        })
        setListaViagensFinalizadas(x)
    }

    const fetchs = async () => {
        const response = await fetch('http://localhost:3000/viagem');
        const data = await response.json();
        setListaViagens(data)
    }
    let queryOptions = { retry: 1, refetchOnWindowFocus: true, refetchInterval: 5000 }
    const { isLoading, isError, refetch } = useQuery('listarViagens', fetchs, queryOptions)

    useEffect(() => {
        procuraViagensAndamento()
        procuraViagensFinalizadas()
    }, [listaViagens])

    useEffect(() => {
        let x = listaViagensAndamento.filter((viagem: Trip) => {
            return viagem.Vehicle.type.toLowerCase() === 'pesado'
        })
        let y = listaViagensAndamento.filter((viagem: Trip) => {
            return viagem.Vehicle.type.toLowerCase() === 'passeio'
        })
        setListaVeiculosAndamentoPesado(x)
        setListaVeiculosAndamentoPasseio(y)
    }, [listaViagensAndamento])

    if (isError) {
        return <h1>Error...</h1>
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <>
            <div className={styles.dashboardViagemContainer}>
                <h1>Viagens</h1>

                <div className={styles.header}>
                    <div className={styles.howUse}>
                        <h3 onClick={() => setShowHowUse(!showHowUse)}>Como Usar {showHowUse ? '?' : '+'}</h3>
                        {showHowUse && <div className={styles.howUseContent}>
                            <hr />
                            <p><b>Em andamento: </b> viagem esta em andamento.</p>
                            <p><b>Finalizadas: </b> viagem foi finalizada.</p>
                            <hr />
                            {user.management && (<><p>Esta página é responsável por listar todas as viagens cadastrados no sistema,
                                além de permitir a inserção de novas.</p>
                                <p>Para inserir uma nova viagem, basta clicar no botão "Adicionar viagem" e preencher os campos com as informações da viagem.</p></>)}
                            <p>Para listar um relatório de todas as viagens, basta clicar no botão "Listar Todas".</p>
                            <p>Para listar as viagens finalizadas, basta clicar no botão "Listar Finalizadas".</p>
                            <p>Para listar as viagens em andamento, basta clicar no botão "Listar em Andamento".</p>
                        </div>}
                    </div>
                </div>

                <div className={styles.dashboardViagemContent}>
                    <div className={styles.dashboardViagemContent}>
                        <nav>
                            <h1 onClick={() => setListarViagens(!listarViagens)}
                                style={useToggleColor(listarViagens)}>Listar Todas</h1>
                            <h1 onClick={() => setListarViagensFinalizadas(!listarViagensFinalizadas)}
                                style={useToggleColor(listarViagensFinalizadas)}>Listar Finalizadas</h1>
                            <h1 onClick={() => setListarViagensEmAndamento(!listarViagensEmAndamento)}
                                style={useToggleColor(listarViagensEmAndamento)}>Listar Em Andamento</h1>
                            {user.management && <h1 onClick={() => setInserirViagem(!inserirViagem)}
                                style={useToggleColor(inserirViagem)}>Adicionar Viagem</h1>}
                            {user.management && <h1 onClick={() => setFinalizarViagem(!finalizarViagem)}
                                style={useToggleColor(finalizarViagem)}>Finalizar Viagem</h1>}
                        </nav>
                        <div className={styles.descContainer}>
                            <div className={styles.descContent}>
                                <h1>Status</h1>
                                <div className={styles.chart}>
                                    <ChartModelPie
                                        title="Tipos de Veiculos em Viagem"
                                        data={[
                                            ['Tipo', 'Quantidade'],
                                            ['Passeio', listaVeiculosAndamentoPasseio.length],
                                            ['Carga', listaVeiculosAndamentoPesado.length],
                                        ]}
                                        strChartType='PieChart'
                                    />
                                </div>
                                <div className={styles.descText}>
                                    <p><b>Finalizadas no mês: </b>{listaViagensFinalizadas.length}</p>
                                    <p><b>Em Andamento: </b>{listaViagensAndamento.length}</p>
                                </div>
                            </div>
                        </div>
                        {user.management && finalizarViagem && <FinalizarViagem viagensAndamentoProps={listaViagensAndamento} refetch={refetch} />}


                        {user.management && inserirViagem && <InserirViagem refetch={refetch} />}


                        {listarViagens && <ListarViagem viagemListProps={listaViagens} refetch={refetch} />}


                        {listarViagensFinalizadas && <ListarViagensFinalizadas viagemListProps={listaViagens.filter((trip) => {
                            return trip.checkOut
                        })} refetch={refetch} />}


                        {listarViagensEmAndamento && <ListarViagensAndamento viagemListProps={listaViagens.filter((trip) => {
                            return !trip.checkOut
                        })} refetch={refetch} />}


                    </div>
                </div>
            </div>

        </>
    )

}