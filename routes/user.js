import express from 'express';
const router = express.Router();

import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// POST Usuario
router.post('/nuevo-usuario', async(req, res) => {
  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role
  }
  // Encriptación de contraseña
  body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

  try {
    const usuarioDB = await User.create(body);
    return res.json(usuarioDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }
});

// PUT Usuario
router.put('/usuario/:id', async(req, res) =>{
  const _id = req.params.id;
  const body = req.body;

  try {
    const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
    return res.json(usuarioDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }
});

module.exports = router;