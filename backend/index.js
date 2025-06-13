const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json()); // Para ler JSON no corpo das requisições

// Configurar conexão com banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // deixe vazio se você não configurou senha no XAMPP
  database: 'abraceapp'
});

// Testar conexão
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Exemplo rota GET para testar
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Coloque aqui suas rotas para criar, ler, atualizar e deletar dados

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
