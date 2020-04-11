import express from 'express';
const router = express.Router();

import User from '../models/user';

// POST
router.post('/nuevo-usuario', async(req, res) => {
  const body = req.body;

  try {
    const usuarioDB = await User.create(body);
    res.json(usuarioDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }
});

module.exports = router;