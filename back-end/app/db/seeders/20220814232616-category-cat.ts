'use strict';
import { Op, QueryInterface } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkInsert('category_cat', [
      {
        id: 1,
        es: 'Actividades al aire libre',
        en: 'Outdoor activities',
        descriptionEs: 'Disfruta de la naturaleza mientras practicas de tu deporte, actividad favorita o participas en un tour.',
        descriptionEn: 'Enjoy nature while you practice your favorite sport, activity or participate in a tour.',
        images: 'cenote.jpg,zipline.jpg,paddle.jpg',
        url: '/outdoor-activities',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        es: 'Antros y bares',
        en: 'Clubs & bars',
        descriptionEs: 'Si bailar, cantar y tomar tequila es lo tuyo, encuentra el mejor lugar para hacerlo.',
        descriptionEn: 'If dancing, singing and drinking tequila is your thing, find the best place to do it.',
        images: 'margarita.jpg,disco.jpg,beer.jpg',
        url: '/clubs-bars',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        es: 'Medios de transporte',
        en: 'Means of transport',
        descriptionEs: 'Renta o compra carros, motos, bicicletas y otros medos de transporte.',
        descriptionEn: 'Rent or buy cars, motorcycles, bicycles and other means of transportation.',
        images: 'parking-spot.jpg,bike.jpg,speedboat.jpg',
        url: '/transport',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        es: 'Bazar',
        en: 'Market',
        descriptionEs: 'Encuentra artículos que podrían serte útiles en tu día a dia.',
        descriptionEn: 'Find articles that could be useful in your day to day.',
        images: 'flea-market.jpg,flea-market3.jpg,flea-market2.jpg',
        url: '/market',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkDelete('category_cat', { id: { [Op.gt]: 0 } });
  }
};
