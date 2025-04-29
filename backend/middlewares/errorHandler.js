const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        errors: err.errors.map(e => ({ msg: e.message }))
      });
    }
  
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        errors: [{ msg: 'El correo ya existe' }]
      });
    }
  
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  const notFound = (req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
  };
  
  module.exports = { errorHandler, notFound };