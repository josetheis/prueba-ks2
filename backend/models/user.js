const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Identificador único autoincremental'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre no puede estar vacío'
        },
      },
      comment: 'Nombre completo del usuario'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'users_email',
        msg: 'Este correo electrónico ya está registrado'
      },
      validate: {
        isEmail: {
          msg: 'Debe proporcionar un correo electrónico válido'
        },
        notEmpty: {
          msg: 'El correo electrónico no puede estar vacío'
        }
      },
      comment: 'Dirección de correo electrónico única'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
      comment: 'Fecha de creación del registro'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
      comment: 'Fecha de última actualización del registro'
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: false,
    hooks: {
      beforeUpdate: (user) => {
        user.updatedAt = new Date();
      }
    },
    comment: 'Tabla de usuarios del sistema'
  });

  return User;
};