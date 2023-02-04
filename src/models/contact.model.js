const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const contact = sequelize.define('contact', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true
    },
    nickName: {
      type: dataType.STRING,
      allowNull: true
    },
    company: {
      type: dataType.STRING,
      allowNull: true
    },
    website: {
      type: dataType.STRING,
      allowNull: true
    },
    label: {
      type: dataType.ENUM("co-workers", "family", "friends"),
      allowNull: true
    },
    relationship: {
      type: dataType.STRING,
      allowNull: true
    },
    birthday: {
      type: dataType.DATE,
      allowNull: true
    },
    state: {
      type: dataType.STRING,
      allowNull: true
    },
    street: {
      type: dataType.STRING,
      allowNull: true
    },
    poBox: {
      type: dataType.STRING,
      allowNull: true
    }
  });
  return contact;
};
