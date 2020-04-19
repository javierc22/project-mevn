import express from 'express';
const router = express.Router();

// Importar el modelo Nota
import Nota from '../models/nota';

// Middleware
const { verificarAuth, verificarAdministrador } = require('../middlewares/autenticacion');

// Agregar una nota
router.post('/nueva-nota', verificarAuth, async(req, res) => {
  const body = req.body;
  body.usuarioId = req.usuario._id;

  try {
    const notaDB = await Nota.create(body);
    res.status(200).json(notaDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});

// Get con parámetros
router.get('/nota/:id', async(req, res) => {
  const _id = req.params.id;

  try {
    const notaDB = await Nota.findOne({_id});
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});

// Get con todos los documentos
// router.get('/notas', verificarAuth, async(req, res) => {
//   const usuarioId = req.usuario._id;
//   try {
//     const notasDB = await Nota.find({ usuarioId });
//     res.json(notasDB);
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: 'Ocurrio un error',
//       error
//     });
//   }
// });

// Get con paginación
router.get('/notas', verificarAuth, async(req, res) => {
  const usuarioId = req.usuario._id;
  const queryLimit = Number(req.query.limit) || 5;
  const querySkip = Number(req.query.skip) || 0;

  try {
    const notasDB = await Nota.find({usuarioId}).skip(querySkip).limit(queryLimit);

    // contar notas
    const totalNotas = await Nota.find({usuarioId}).countDocuments();

    res.json({notasDB, totalNotas});

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Eliminar una Nota
router.delete('/nota/:id', async(req, res) => {
  const _id = req.params.id;

  try {
    const notaDB = await Nota.findByIdAndDelete({_id});
    if(!notaDB){
      return res.status(400).json({
        mensaje: 'No se encontró el ID indicado',
        error
      });
    }
    
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});

// Actualizar una Nota
router.put('/nota/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;

  try {
    const notaDB = await Nota.findByIdAndUpdate(_id, body, {new: true});
    res.json(notaDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }
});

// Exportación de router
module.exports = router;