const express = require('express');
const { sequelize } = require('./models');
const usersRouter = require('./routes/users');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Conectar a la base de datos
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Sincronizar modelos
sequelize.sync({ force: false })
  .then(() => console.log('Models synchronized'))
  .catch(err => console.error('Model synchronization failed:', err));

// Rutas
app.use('/users', usersRouter);

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;