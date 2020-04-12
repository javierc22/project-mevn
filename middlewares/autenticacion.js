const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {
  // res.json({
  //   mensaje: 'Dentro del middleware'
  // });

  const token = req.get('token');

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(400).json({
        mensaje: 'Usuario no válido'
      })
    }

    next();
  });
}

module.exports = { verificarAuth }