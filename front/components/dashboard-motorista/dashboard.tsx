// import InserirMotorista from 'components/inserir-Motorista';
// import ListarMotorista from 'components/listar-Motoristas';
// import ListarIndisponiveis from 'components/listar-Motoristas-indisponiveis';
// import ListarDisponiveis from './../listar-Motoristas-disponiveis/index';
import styles from './dashboard.module.scss';
import { useState } from 'react';



export default function DashboardMotorista() {
    const [listarMotorista, setListarMotorista] = useState(false);
    const [listarMotoristaDisp, setListarMotoristaDisp] = useState(false);
    const [listarMotoristaIndisp, setListarMotoristaIndisp] = useState(false);
    const [inserirMotorista, setInserirMotorista] = useState(false);

    return (
        <>
            <div className={styles.dashboardMotoristaContainer}>
                <div className={styles.dashboardMotoristaContent}>
                    <nav>
                        <h1 onClick={() => setListarMotorista(!listarMotorista)}>Listar Todos Motoristas</h1>
                        <h1 onClick={() => setListarMotoristaDisp(!listarMotoristaDisp)}>Listar Disponíveis</h1>
                        <h1 onClick={() => setListarMotoristaIndisp(!listarMotoristaIndisp)}>Listar Indisponíveis</h1>
                        <h1 onClick={() => setInserirMotorista(!inserirMotorista)}>Adicionar Motorista</h1>
                    </nav>
                    {/* {inserirMotorista && < InserirMotorista />}
                    {listarMotoristaDisp && <ListarDisponiveis />}
                    {listarMotorista && <ListarMotorista />}
                    {listarMotoristaIndisp && <ListarIndisponiveis />} */}
                </div>
            </div>
        </>
    )
}