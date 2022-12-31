'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Reviews',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        spotId: {
          // onDelete: 'CASCADE'
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Spots' },
        },
        userId: {
          // onDelete: 'CASCADE'
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users' },
        },
        review: {
          type: Sequelize.STRING,
        },
        stars: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.dropTable(options);
  },
};
