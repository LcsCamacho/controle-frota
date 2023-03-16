//imports
import express from 'express'
import cors from 'cors'
import { routerUsuario } from './routes/usuario'
import { routerMotorista } from './routes/motorista'
import { routerManutencao } from './routes/manutencao'
import { routerVeiculo } from './routes/veiculo'
import { routerViagem } from './routes/viagem'

//app
const app = express();
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.use(routerUsuario);
app.use(routerMotorista);
app.use(routerManutencao);
app.use(routerVeiculo);
app.use(routerViagem)


app.listen(3000, () => {
    console.log('Server running on port 3000')
});