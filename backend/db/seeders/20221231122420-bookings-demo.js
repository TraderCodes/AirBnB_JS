'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

options.tableName = 'Bookings';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date('2022-01-01'),
          endDate: new Date('2022-01-05'),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date('2022-02-01'),
          endDate: new Date('2022-02-05'),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date('2022-03-01'),
          endDate: new Date('2022-03-05'),
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
