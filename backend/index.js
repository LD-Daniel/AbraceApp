const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'abraceapp'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

app.get('/formularios', (req, res) => {
  const sql = 'SELECT * FROM formularios ORDER BY data_preenchimento DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar formulários:', err);
      return res.status(500).json({ erro: 'Erro ao buscar formulários' });
    }
    return res.json(results);
  });
});

// Teste do backend
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Rota para salvar formulário
app.post('/formularios', (req, res) => {
  const {
    usuario_id,
    nome,
    placa,
    rota_id,
    km_saida,
    km_chegada,
    hr_saida,
    hr_chegada,
    data_preenchimento,
    paradas
  } = req.body;

  // Convertendo array de paradas para JSON (texto)
  const paradasTexto = paradas && paradas.length > 0 ? JSON.stringify(paradas) : null;

  const sqlFormulario = `
    INSERT INTO formularios 
    (usuario_id, nome, placa, rota_id, km_saida, km_chegada, hr_saida, hr_chegada, data_preenchimento, paradas)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    usuario_id,
    nome,
    placa,
    rota_id,
    km_saida,
    km_chegada,
    hr_saida,
    hr_chegada,
    data_preenchimento,
    paradasTexto
  ];

  db.query(sqlFormulario, valores, (err, result) => {
    if (err) {
      console.error('Erro ao inserir formulário:', err);
      return res.status(500).json({ erro: 'Erro ao salvar formulário' });
    }

    return res.status(201).json({ sucesso: true, formulario_id: result.insertId });
  });
});

// Tela de Login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha obrigatórios.' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ? LIMIT 1';
  db.query(query, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco:', err);
      return res.status(500).json({ erro: 'Erro interno no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    const usuario = results[0];
    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      perfil: usuario.perfil, // 'supervisor' ou 'caminhoneiro'
    });
  });
});



// Start do servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
