const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// Para acceder al directorio actual
const path = require('path');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })) //application/x-www-form-urlencoded

// Rutas
app.get('/', function(req, res) {
  res.send('Hola Mundo!');
})

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function() {
  console.log('Escuchando el puerto:', app.get('puerto'));
})