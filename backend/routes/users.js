const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');

// Crear usuario
router.post(
  '/',
  [
    check('name').not().isEmpty().withMessage('El nombre es requerido'),
    check('email').isEmail().withMessage('Correo electronico invalido'),
  ],
  userController.createUser
);

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Obtener usuario por ID
router.get('/:id', userController.getUserById);

// Actualizar usuario
router.put(
  '/:id',
  [
    check('name').optional().not().isEmpty().withMessage('El nombre es requerido'),
    check('email').optional().isEmail().withMessage('Correo electronico invalido'),
  ],
  userController.updateUser
);

// Eliminar usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;