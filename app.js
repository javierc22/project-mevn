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
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.send('Hola Mundo!');
})

app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function() {
  console.log('Escuchando el puerto:', app.get('puerto'));
})