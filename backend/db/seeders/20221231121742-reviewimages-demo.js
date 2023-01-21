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
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1778388/original/63fe8d30-9834-4619-8228-c99cbfadcd2d.jpeg?im_w=720',
        },
        {
          reviewId: 2,
          url: 'https://a0.muscache.com/im/pictures/9c0d2e2e-6da0-463a-945e-0bcc1e69a4c5.jpg?im_w=720',
        },
        {
          reviewId: 3,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-22884030/original/338362fb-4db5-4275-bb1e-793b44afdb61.jpeg?im_w=720',
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
