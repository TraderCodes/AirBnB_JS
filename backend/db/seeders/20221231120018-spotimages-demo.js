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
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-22884030/original/347a8991-5f21-43bb-a148-962b7b1e28be.jpeg?im_w=1200',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/bd0defd5-e2cb-4c67-8073-8fbe584cefb3.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/25215026/5ec14c81_original.jpg?im_w=1200',
          preview: true,
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
