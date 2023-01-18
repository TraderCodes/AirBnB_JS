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
          address: '3421 Vineyard Drive',
          city: 'Oxnard',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Beachfront Home | Ocean/Island Views | Near Harbor',
          description: 'sunrise & sunset views outside your window ,',
          price: 574,
        },
        {
          ownerId: 2,
          address: '436 Rollins Road',
          city: 'Paso Robles',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Prince Suite at High Ridge Manor',
          description:
            'Only "Lux rated" B&B in Paso Robles! Voted one of the Top 14 "Most Romantic B&B/Inns in the United States by Travelers Choice Award!',
          price: 275,
        },
        {
          ownerId: 2,
          address: '926 Sunrise Road',
          city: 'Malibu',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Stunning Luxury Oceanfront Beach Home w/ Large Deck',
          description:
            'This romantic charmer, right on Livingston Beach in West Malibu, is perfect for vacationers looking for a nice quiet beach without a lot of people',
          price: 583,
        },
        {
          ownerId: 3,
          address: '843 Rockford Road',
          city: 'Frazier Park',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Paradise in the Pines',
          description:
            'This 3000sq ft log cabin is the perfect mountain getaway to Escape the traffic',
          price: 429,
        },
        {
          ownerId: 4,
          address: '767 Brown Bear Drive',
          city: 'Los Angeles',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Luxury Villa Los Angeles 5 BD & Pool',
          description:
            'Beautiful luxury high-end house with 5 bedrooms, large kitchen pool ',
          price: 699,
        },
        {
          ownerId: 4,
          address: '4430 Payne Street',
          city: 'Fire City',
          state: 'Granada',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Casa Cueva with fireplace "La Estrella"',
          description:
            'Enjoy this beautiful newly renovated cave house, with swimming pool, fireplace, south facing and with direct light in almost the entire accommodation',
          price: 76,
        },
        {
          ownerId: 5,
          address: '3858 Parrill Court',
          city: 'Bear Vally',
          state: 'Los Angeles',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Lux 4 Bedroom Mountain Home W/ Sauna & Jacuzzi Tub',
          description:
            'Over 3,000 sq. ft. luxury mountain home on acre+ of private woods on back slope of Bear Valley Ski Resort.  BEAR CUB CABIN ',
          price: 631,
        },
        {
          ownerId: 5,
          address: '3486 Ryan Road',
          city: 'Vivian',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Rouge Elite',
          description:
            'Curving to a sharp point that reaches over the infinity pool, this modern house juts like the bow of a ship over water just off Mulholland Drive',
          price: 4536,
        },
        {
          ownerId: 3,
          address: '1273 Tetrick Road',
          city: 'Nipomo',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Getaway at the Highlands+HEATED POOL!',
          description:
            'You will be tucked in the beautiful hills of Nipomo on the central coast of California only 12 miles from Pismo beach.',
          price: 360,
        },
        {
          ownerId: 4,
          address: '2894 Alexander Avenue',
          city: 'Alexander',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Resort Oasis',
          description:
            'This is a gorgeous 500 sq foot pool house with chef’s kitchen.  Full access to pool, spa, outdoor kitchen and all the various garden areas on 1/3 of an acre.',
          price: 134,
        },
        {
          ownerId: 5,
          address: '3837 Crestview Manor',
          city: 'Santa Margarita',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: '8 Mile House',
          description:
            'Experience the legacy and luxury of this Historic Ranch Home, “The 8 Mile House”—your place to call home… on the historic Santa Margarita Ranch.',
          price: 353,
        },
        {
          ownerId: 2,
          address: '459 Meadow View Drive',
          city: 'Agoura Hills',
          state: 'California',
          country: 'United States',
          lat: 40.76358,
          lng: -133.47327,
          name: 'Stunning Spanish Villa with Vineyard',
          description:
            'Escape to our charming Spanish style villa, located just a short drive from the stunning beaches of Malibu. Nestled on a half acre of land with a beautiful vineyard',
          price: 2995,
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
        country: { [Op.in]: ['United States'] },
      },
      {}
    );
  },
};
