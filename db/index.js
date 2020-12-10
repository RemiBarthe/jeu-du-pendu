const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'words.caaqbw2slaog.eu-west-3.rds.amazonaws.com',
  user     : 'admin',
  password : 'Caramel78220'
});

module.exports = connection;