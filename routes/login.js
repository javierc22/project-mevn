const express = require('express');
const router = express.Router();
import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async(req, res) => {
  const body = req.body;

  try {
    // Evaluando email
    const usuarioDB = await User.findOne({email: body.email});
    if (!usuarioDB) {
      return res.status(400).json({
        mensaje: 'Email no encontrado',
      });
    }

    // Evaluando contraseña
    if (!bcrypt.compareSync(body.pass, usuarioDB.pass)) {
      return res.status(400).json({
        mensaje: 'Contraseña incorrecta',
      });
    }

    res.json({
      usuarioDB,
      token: 'tokendeprueba'
    });

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }
})

module.exports = router;