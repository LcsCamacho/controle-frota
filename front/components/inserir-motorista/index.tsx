import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { openDashboardReducerDriver } from 'features/redux/driver-slice';

export default function InserirMotorista() {
    const dispatch = useDispatch();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const name = event.target.name.value;
        const cnh = event.target.cnh.value;
        const response = await fetch('http://localhost:3000/motorista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                cnh
            })
        })
        let status = response.status === 200 ? true : false;
        alert(
            status ?
                'Motorista inserido com sucesso' :
                'Erro ao inserir Motorista'
        );
        if (status) {
            dispatch(openDashboardReducerDriver())
            event.target.name.value = '';
            event.target.cnh.value = '';
        }

    }

    return (
        <div className={styles.carFormContainer}>
            <form className={styles.carForm} onSubmit={handleSubmit}>
                <h1>Adicionar Motorista</h1>
                <div className={styles.carFormInput}>
                    <label htmlFor="name">Nome</label>
                    <input type="text" placeholder='Insira o Nome' name="name" id="name" />
                    <label htmlFor="cnh">CNH</label>
                    <input type="text" placeholder='Insira a CNH' name="cnh" id="cnh" />
                    <button type="submit" >Inserir Motorista</button>
                </div>
            </form>
        </div>
    )
}