import { useEffect, useState } from 'react';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styles from './dashboard.module.scss';

export default function ListarManutencao() {
    const { user } = useSelector((state: any) => state.user);

    const [maintenanceList, setMaintenanceList] = useState<any[]>([]);

    const listarManutencoes = async () => {
        const response = await fetch('http://localhost:3000/manutencao',
            { cache: 'default' });
        const data = await response.json();
        let x = data.filter((maintenance: any) => maintenance.checkout === null);
        setMaintenanceList(x);
    }

    let arr = ['', '', '']

    let queryOptions = { retry: 5, refetchOnWindowFocus: true, refetchInterval: 5000, initialState: arr }

    const { isError, isLoading } = useQuery('manutencao', listarManutencoes, queryOptions)

    if(isLoading) return <h1>Carregando...</h1>
    if(isError) return <h1>Erro ao carregar</h1>

    return (
        <>
            <div className={styles.listMaintenanceContainer}>
                <div className={styles.listMaintenanceContent}>
                    <h1>Lista de Manutenções em Andamento</h1>
                    <h2>Quantidade: {maintenanceList.length}</h2>
                    <table className={styles.tableMaintenance}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Veículo</th>
                                <th>Descrição</th>
                                <th>Custo</th>
                                <th>Data</th>
                                <th>Criado em</th>
                                <th>Atualizado em</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbodyMaintenance}>
                            {maintenanceList.map((maintenance: any, index: any) => (
                                <tr className={styles.maintenanceItem} key={index}>
                                    <td>Id:{String(maintenance.id)}</td>
                                    <td>{maintenance.Vehicle.plate}</td>
                                    <td>{maintenance.description}</td>
                                    <td>{maintenance.cost}</td>
                                    <td>{maintenance.date.slice(0,10)}</td>
                                    <td>{new Date(maintenance.createdAt).toLocaleString()}</td>
                                    <td>{new Date(maintenance.updatedAt).toLocaleString()}</td>
                                    {user.management && (
                                    <>
                                        <td>Excluir</td>
                                        <td>Editar</td>
                                    </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}