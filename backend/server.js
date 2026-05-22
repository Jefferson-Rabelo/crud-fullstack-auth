require('dotenv').config();// Carrega variáveis de ambiente do arquivo .env
require('./src/database/db');
const express = require('express');//IMPORTA O EXPRESS/CRIA O SERVIDOR
const cors = require('cors');//Ele permite que um domínio diferente acesse sua API/CONEXAO BACK-END COM FRONT-END
const userRoutes = require('./src/routes/userRoutes');
const app = express();//CRIA O SERVIDOR

app.use(cors({
    origin: 'https://crud-fullstack-auth.vercel.app'
}));//permite acesso externo (Front-end React)
app.use(express.json());//Permite que a API receba JSON no corpo das requisições
app.use('/api', userRoutes);
// Rota de teste para verificar se a API está funcionando
app.get('/', (req, res) => {
    res.send('API rodando 2026 🚀');
});

//Porta dinâmica para suportar ambiente de produção (Render, Railway, etc)
const PORT = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});