'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

options.tableName = 'ReviewImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      options,
      [
        {
          reviewId: 1,
          url: 'http://shorturl.at/ijkCQ',
        },
        {
          reviewId: 2,
          url: 'https://shorturl.at/fkzEM',
        },
        {
          reviewId: 3,
          url: 'https://shorturl.at/jlBQS',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
