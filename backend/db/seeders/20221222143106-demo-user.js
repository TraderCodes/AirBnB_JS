'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(
      options,
      [
        {
          firstName: 'Demo',
          lastName: 'User',
          email: 'demo@user.io',
          username: 'Demo_User',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Josh',
          lastName: 'Byrne',
          email: 'user1@user.io',
          username: 'Josh01',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Wilson',
          lastName: 'Hubbard',
          email: 'user2@user.io',
          username: 'Wilson',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Bianca',
          lastName: 'Martin',
          email: 'user3@user.io',
          username: 'Bianca',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Skyla',
          lastName: 'Reyes',
          email: 'user4@user.io',
          username: 'Skyla',
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          firstName: 'Elodie',
          lastName: 'Dunlap',
          email: 'user5@user.io',
          username: 'Elodie',
          hashedPassword: bcrypt.hashSync('password'),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            'Demo_User',
            'Elodie',
            'Skyla',
            'Bianca',
            'Wilson',
            'Josh01',
          ],
        },
      },
      {}
    );
  },
};
