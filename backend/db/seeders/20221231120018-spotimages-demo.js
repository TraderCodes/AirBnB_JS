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
          url: 'https://a0.muscache.com/im/pictures/59d8a1be-6447-495c-9ff0-4778ab974278.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/04e2dfd8-7f28-4c83-b4a5-d133f90e8c07.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/e0be16f9-00ef-4cd1-8334-17e88ce794ec.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-699911008144750857/original/4ce53977-7a83-4972-b25c-e49815589450.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://a0.muscache.com/im/pictures/3aab70d3-8f54-4974-82ce-7c2793bcdb7a.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/bd0defd5-e2cb-4c67-8073-8fbe584cefb3.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/9c0d2e2e-6da0-463a-945e-0bcc1e69a4c5.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/652dcc30-3875-4578-8e55-d570676d336c.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/e41dc6d3-5ca3-446c-b0e7-d8a5827b2ef7.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/7c610feb-5e54-4e88-a20f-bd45d49d1ef9.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185693/original/a8bc2d40-8b41-4230-8356-82a760efa636.jpeg?im_w=1200',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185693/original/1d53f0b1-23de-4f57-9ae3-f7f779cd6461.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185693/original/019ba5a5-4fdd-40f6-b297-6fa23eb7f80e.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185693/original/b7df1b23-6d84-4aca-8a80-01ab872298ec.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185693/original/100ae219-f8bd-4bbf-b05e-9a9b411d5a27.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://a0.muscache.com/im/pictures/1058f808-ea47-4d51-8ccb-32a840ade68f.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://a0.muscache.com/im/pictures/b7525766-6ce4-4ab8-8ef3-18315246b221.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://a0.muscache.com/im/pictures/eb315402-d6f2-47ab-935a-1b31506dcd38.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://a0.muscache.com/im/pictures/706bbb2f-e541-400a-8da8-b1d6c95de830.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 4,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-25214562/original/5c6aaf56-e153-455e-8e85-82b5c8a4894b.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 5,
          url: 'https://a0.muscache.com/im/pictures/a5667355-e931-4bdb-bc03-2bdceade6358.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://a0.muscache.com/im/pictures/dade716b-a186-462a-9b9b-6d00d28ffd9f.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 5,
          url: 'https://a0.muscache.com/im/pictures/066449d4-f99a-4cd4-bf45-c0ffa020af7a.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 5,
          url: 'https://a0.muscache.com/im/pictures/25fe3499-a268-4c44-8862-16656f409b49.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 5,
          url: 'https://a0.muscache.com/im/pictures/2875a9af-ee87-496e-adb7-80c3e74de382.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 6,
          url: 'https://a0.muscache.com/im/pictures/a968037a-642e-430d-bb49-53d1c51e847b.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 6,
          url: 'https://a0.muscache.com/im/pictures/35cb91bf-34ed-45bd-919d-5c70457dfe43.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 6,
          url: 'https://a0.muscache.com/im/pictures/996f27ee-ed8c-45ea-981a-a82fa1ede683.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 6,
          url: 'https://a0.muscache.com/im/pictures/6bd9fd17-3868-4160-81b6-989183c7e270.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 6,
          url: 'https://a0.muscache.com/im/pictures/2eb2584a-caac-4544-a6be-909d047995c9.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 7,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40758524/original/143243ac-7a49-4170-a386-d19887c6a849.jpeg?im_w=1200',
          preview: true,
        },
        {
          spotId: 7,
          url: 'https://a0.muscache.com/im/pictures/4cd556c8-b21b-4c71-b665-fc69a826a36d.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 7,
          url: 'https://a0.muscache.com/im/pictures/a2dc15ed-74dd-4a5b-94e3-884abb1c17b8.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 7,
          url: 'https://a0.muscache.com/im/pictures/05d1fcd3-a6eb-4c2a-8a41-72266f628572.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 7,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40758524/original/b0f46aab-9dfd-4b50-89f9-401374c0d380.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 8,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18182249/original/ce49756c-0920-4765-bf3c-c5ceed837208.jpeg?im_w=1200',
          preview: true,
        },
        {
          spotId: 8,
          url: 'https://a0.muscache.com/im/pictures/3625019d-94ca-49a3-bcbd-8204be29e243.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 8,
          url: 'https://a0.muscache.com/im/pictures/e186b4c9-6722-437d-a3b6-d50f55d15b36.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 8,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18182249/original/c88710cf-3cae-4a1e-87f1-91423afd64a5.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 8,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18182249/original/34707a05-da4f-4bc8-b4b8-8ae080b9f697.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 9,
          url: 'https://a0.muscache.com/im/pictures/b9f56545-a828-4904-bd21-66e4d602531d.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 9,
          url: 'https://a0.muscache.com/im/pictures/49cdb6ab-25c4-4542-b827-306b8367cddc.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 9,
          url: 'https://a0.muscache.com/im/pictures/772b20cb-b05f-46a1-8ac4-1c0b8ffce63c.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 9,
          url: 'https://a0.muscache.com/im/pictures/331ff82a-cd66-40cc-82b3-9f6207ebdf8c.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 9,
          url: 'https://a0.muscache.com/im/pictures/38c6f50d-4b7a-4a99-b9c4-a491c5d6ab1f.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 10,
          url: 'https://a0.muscache.com/im/pictures/b89200d1-b28b-4d0d-8e2d-3165fcd00e79.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 10,
          url: 'https://a0.muscache.com/im/pictures/40d7515e-6823-497b-8f16-0156db771a0d.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 10,
          url: 'https://a0.muscache.com/im/pictures/b10d4655-9953-4c1f-84b7-0e03254bdec0.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 10,
          url: 'https://a0.muscache.com/im/pictures/adf0670c-d4c8-44a7-a4c2-7b536d20141e.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 10,
          url: 'https://a0.muscache.com/im/pictures/da03bb46-b679-4677-a252-a071bbd75ec4.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 11,
          url: 'https://a0.muscache.com/im/pictures/d24a32a8-e2b1-440a-8024-9915ccf1d4d8.jpg?im_w=1200',
          preview: true,
        },
        {
          spotId: 11,
          url: 'https://a0.muscache.com/im/pictures/b8ea9b23-5ab3-4161-a0ca-348311a68645.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 11,
          url: 'https://a0.muscache.com/im/pictures/e5ea9d30-2567-4a6f-b81b-e3c5134cd604.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 11,
          url: 'https://a0.muscache.com/im/pictures/98c6a546-579b-4fad-8df9-2196396fcdea.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 11,
          url: 'https://a0.muscache.com/im/pictures/4ca2d26e-5124-43e1-9dbb-53c196c7d877.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 12,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18182249/original/ce49756c-0920-4765-bf3c-c5ceed837208.jpeg?im_w=1200',
          preview: true,
        },
        {
          spotId: 12,
          url: 'https://a0.muscache.com/im/pictures/3625019d-94ca-49a3-bcbd-8204be29e243.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 12,
          url: 'https://a0.muscache.com/im/pictures/e186b4c9-6722-437d-a3b6-d50f55d15b36.jpg?im_w=720',
          preview: false,
        },
        {
          spotId: 12,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18182249/original/c88710cf-3cae-4a1e-87f1-91423afd64a5.jpeg?im_w=720',
          preview: false,
        },
        {
          spotId: 12,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18182249/original/34707a05-da4f-4bc8-b4b8-8ae080b9f697.jpeg?im_w=720',
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
        spotId: { [Op.in]: [1, 2, 3,4,5,6,7,8,9,10,11,12] },
      }),
      {}
    );
  },
};
