'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

options.tableName = 'SpotImages';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: 'https://shorturl.at/elAHJ',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://shorturl.at/GKU49',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://shorturl.at/deGPZ',
          preview: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    return (
      queryInterface.bulkDelete(options, {
        spotId: { [Op.in]: [1, 2, 3] },
      }),
      {}
    );
  },
};
