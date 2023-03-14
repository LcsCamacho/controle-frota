import { useAddDriver } from 'hooks/UseAddDriver';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { Driver } from 'types';

export default function InserirMotorista({refetch}:any) {
    const { user:{token} } = useSelector((state: any) => state.user);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        let data:Driver = {
            name:event.target.name.value,
            cnh:event.target.cnh.value,
            avaliable: true
        }
        useAddDriver(data)
        .then(res => {
            event.target.name.value = ''
            event.target.cnh.value = ''
            refetch()
        })
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