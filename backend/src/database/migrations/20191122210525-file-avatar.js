module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('avatars', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: null,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('avatars');
  },
};
