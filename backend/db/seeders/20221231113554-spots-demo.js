'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Spots';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: '1001 Cool Street',
          city: 'Santa Barbara',
          state: 'Runescape',
          country: 'USA',
          lat: 11.11,
          lng: 22.22,
          name: 'Invisible House',
          description: 'free protection from Host cancellations',
          price: 111,
        },
        {
          ownerId: 2,
          address: '2002 Cool Street',
          city: 'Lost City',
          state: 'Maple Story',
          country: 'USA',
          lat: 33.33,
          lng: 44.44,
          name: 'TThe Kellogg Doolittle House',
          description: 'free protection from Host cancellations',
          price: 222,
        },
        {
          ownerId: 3,
          address: '3003 Cool Street',
          city: 'Fire City',
          state: 'Los Angeles',
          country: 'USA',
          lat: 55.55,
          lng: 66.66,
          name: 'Minimalist Modern Cabin',
          description: 'free protection from Host cancellations',
          price: 333,
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        country: { [Op.in]: ['USA'] },
      },
      {}
    );
  },
};
