const express = require('express');
const { Client } = require('pg');
const ping = require('ping');
const dns = require('dns');
require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors());

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Endpoint para obter a tabela de dispositivos
app.get('/devices', async (req, res) => {

    // Configuração do cliente PostgreSQL
    const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
    },
  });

  try {
    await client.connect();
    await client.query("use empresa");
    console.log("Data Base Selected!");
    const query = 'SELECT * FROM dispositivos ORDER BY data_last_ping DESC LIMIT 31';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao consultar dispositivos:", err);
    res.status(500).send("Erro ao consultar dispositivos");
  } finally {
    await client.end();
    console.log("Connection closed.");
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Server port: 3000');
});
