'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

options.tableName = 'Reviews';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          review: 'Too Hot',
          stars: 1,
        },
        {
          spotId: 2,
          userId: 2,
          review: 'Very comfortable bed',
          stars: 2,
        },
        {
          spotId: 3,
          userId: 3,
          review: 'Such a unique and wonderful place',
          stars: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] },
    });
  },
};
