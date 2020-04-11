const express = require('express');
const router = express.Router();
import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', async(req, res) => {
  res.json({mensaje: 'Funciona!'})
})

module.exports = router;