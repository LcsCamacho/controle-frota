//imports
import express from 'express'
import cors from 'cors'
import { routerUsuario } from './routes/usuario'
import { routerOperacoes } from './routes/operacoes'
import { routerMotorista } from './routes/motorista'
import { routerManutencao } from './routes/manutencao'
import { routerVeiculo } from './routes/veiculo'

//app
const app = express();
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.use(routerUsuario);
app.use(routerOperacoes);
app.use(routerMotorista);
app.use(routerManutencao);
app.use(routerVeiculo);


app.listen(3000, () => {
    console.log('Server running on port 3000')
});