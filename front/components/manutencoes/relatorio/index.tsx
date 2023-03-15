import { useState, useEffect } from 'react';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Maintenance } from 'types';
import { MaintenanceProps } from '../listar-manutencoes';
import styles from './style.module.scss'
import { useRemoveMaintenance } from './../../../hooks/UseRemoveMaintenance';

export default function RelatorioManutencao({ data, refetch }: MaintenanceProps) {
    const { user } = useSelector((state: any) => state.user);
    const { removeMaintenance } = useRemoveMaintenance();
    const [newMaintenanceList, setNewMaintenanceList] = useState<Maintenance[]>([]);
    const [search, setSearch] = useState<String>('');
    useEffect(() => {
        if (search.length === 0) {
            setNewMaintenanceList(data)
            return
        }
        let x = newMaintenanceList.filter((maintenance: any) => {
            return maintenance.Vehicle.plate.toLowerCase().includes(search.toLowerCase())
        })
        setNewMaintenanceList(x)
    }, [search])

    useEffect(() => {
        console.log(data)
        setNewMaintenanceList(data)
    }, [])
    return (
        <>
            <div className={styles.listMaintenanceContainer}>
                <div className={styles.listMaintenanceContent}>
                    <h1>Relatório Geral</h1>
                    <div className={styles.buscar}>
                        <label htmlFor="search">Buscar por placa: </label>
                        <input type='search' id='search' placeholder="Digite a placa do veiculo" onChange={(e) => {
                            setSearch(e.target.value)
                        }} />
                    </div>
                    <h2>Quantidade: {newMaintenanceList.length}</h2>
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
                                <th>Finalizada</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbodyMaintenance}>
                            {newMaintenanceList.map((maintenance: any, index: any) => (
                                <tr className={styles.maintenanceItem} key={index}>
                                    <td>Id:{String(maintenance.id)}</td>
                                    <td>{maintenance.Vehicle.plate}</td>
                                    <td>{maintenance.description}</td>
                                    <td>{maintenance.cost}</td>
                                    <td>{maintenance.date.slice(0, 10)}</td>
                                    <td>{new Date(maintenance.createdAt).toLocaleString()}</td>
                                    <td>{new Date(maintenance.updatedAt).toLocaleString()}</td>
                                    <td>{maintenance.checkout ? <FcApproval /> : <FcCancel />}</td>
                                    {user.management && (
                                        <>
                                            <td onClick={() => {
                                                removeMaintenance(maintenance.id)
                                                    .then(() => refetch())
                                            }} id={styles.del}>Excluir</td>
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

