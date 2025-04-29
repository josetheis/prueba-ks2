const { validationResult } = require('express-validator');
const { User } = require('../models');

// Crear un nuevo usuario
exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });
    
    if (updated === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};