import styles from './style.module.scss';

export default function InserirCarro() {

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const model = event.target.model.value;
        const plate = event.target.plate.value;
        const response = await fetch('http://localhost:3000/carro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model,
                plate
            })
        });
        let status = response.status === 200 ? true : false;
        alert(
            status ? 
            'Carro inserido com sucesso' : 
            'Erro ao inserir carro'
        );
        if(status) {
            event.target.model.value = '';
            event.target.plate.value = '';
        }

    }

    return (
        <div className={styles.carFormContainer}>
            <form className={styles.carForm} onSubmit={handleSubmit}>
                <h1>Adicionar Carro</h1>
                <div className={styles.carFormInput}>
                    <label htmlFor="model">Modelo</label>
                    <input type="text" placeholder='Insira o Modelo' name="model" id="model" />
                    <label htmlFor="plate">Placa</label>
                    <input type="text" placeholder='Insira a Placa' name="plate" id="plate" />
                    <button type="submit" >Inserir Carro a Frota</button>
                </div>
            </form>
        </div>
    )
}