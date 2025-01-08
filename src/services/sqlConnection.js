const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'SpBD2022!',
  database: 'pi2'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = connection;