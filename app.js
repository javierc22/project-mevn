const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('tiny'));
app.use(cors());

app.get('/', function(req, res) {
  res.send('Hola Mundo!');
})

app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function() {
  console.log('Escuchando el puerto:', app.get('puerto'));
})