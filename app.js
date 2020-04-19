const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// Para acceder al directorio actual
const path = require('path');

// Conexión base de datos
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/udemy';

// Conexión en la nube
// const uri = 'mongodb+srv://user_udemy:O8mBBrEuPs03sdhH@project-mevn-mujzf.mongodb.net/udemy?retryWrites=true&w=majority';

const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

// Or using promises
mongoose.connect(uri, options).then(
  /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
  () => { console.log('Conectado a DB') },
  /** handle initial connection error */
  err => { console.log(err) }
);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })) //application/x-www-form-urlencoded

// Rutas
// app.get('/', function(req, res) {
//   res.send('Hola Mundo!');
// })
app.use('/api', require('./routes/nota'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'));


// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function() {
  console.log('Escuchando el puerto:', app.get('puerto'));
})