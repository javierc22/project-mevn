const express = require('express');
const router = express.Router();
import User from '../models/user';

// JWT
const jwt = require('jsonwebtoken');

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

    // Generar Token
    let token = jwt.sign({
      data: usuarioDB
    }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días
    
    // Pasó las validaciones
    return res.json({
      usuarioDB,
      token: token
    })
    
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }
})

module.exports = router;