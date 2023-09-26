'use strict';
import { Op, QueryInterface } from 'sequelize';
import { createGeoPoint } from '../../utils/utils';

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkInsert('mx_locality_cat', [
      { id: 1, name: 'Tulum Centro', lat: 20.210777, lng: -87.463205, geopoint: createGeoPoint(20.210777, -87.463205), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 2, name: 'Akumal', lat: 20.400935, lng: -87.322436, geopoint: createGeoPoint(20.400935, -87.322436), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 3, name: 'Gran Bahía Príncipe', lat: 20.370382, lng: -87.334666, geopoint: createGeoPoint(20.370382, -87.334666), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 4, name: 'Chanchén Palmar', lat: 20.289269, lng: -87.97451, geopoint: createGeoPoint(20.289269, -87.97451), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 5, name: 'Chanchen Primero', lat: 20.401207, lng: -87.968373, geopoint: createGeoPoint(20.401207, -87.968373), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 6, name: 'Chan Chemuyil', lat: 20.342557, lng: -87.353839, geopoint: createGeoPoint(20.342557, -87.353839), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 7, name: 'Cobá', lat: 20.495495, lng: -87.734722, geopoint: createGeoPoint(20.495495, -87.734722), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 8, name: 'Crucero de las Ruinas de Tulum', lat: 20.217909, lng: -87.436259, geopoint: createGeoPoint(20.217909, -87.436259), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 9, name: 'Francisco Uh May', lat: 20.36439, lng: -87.590085, geopoint: createGeoPoint(20.36439, -87.590085), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 10, name: 'Hondzonot', lat: 20.367667, lng: -87.974464, geopoint: createGeoPoint(20.367667, -87.974464), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 11, name: 'Jacinto Pat', lat: 20.316052, lng: -87.367876, geopoint: createGeoPoint(20.316052, -87.367876), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 12, name: 'Javier Rojo Gómez (Punta Allen)', lat: 19.800346, lng: -87.47648, geopoint: createGeoPoint(19.800346, -87.47648), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 13, name: 'Macario Gómez', lat: 20.350776, lng: -87.575954, geopoint: createGeoPoint(20.350776, -87.575954), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 14, name: 'Manuel Antonio Ay', lat: 20.429839, lng: -87.652645, geopoint: createGeoPoint(20.429839, -87.652645), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 15, name: 'Sahcab Mucuy', lat: 20.414971, lng: -87.974488, geopoint: createGeoPoint(20.414971, -87.974488), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 16, name: 'San Juan (Isla pájaros)', lat: 19.877297, lng: -87.435236, geopoint: createGeoPoint(19.877297, -87.435236), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 17, name: 'Tankah Cuatro', lat: 20.283807, lng: -87.379262, geopoint: createGeoPoint(20.283807, -87.379262), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 18, name: 'Yaxché', lat: 20.339889, lng: -87.947737, geopoint: createGeoPoint(20.339889, -87.947737), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 19, name: 'Yalkú', lat: 20.411826, lng: -87.308106, geopoint: createGeoPoint(20.411826, -87.308106), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 20, name: 'Tankah Pueblo', lat: 20.24307, lng: -87.448238, geopoint: createGeoPoint(20.24307, -87.448238), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 21, name: 'Marités', lat: 20.22657, lng: -87.491569, geopoint: createGeoPoint(20.22657, -87.491569), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 22, name: 'Dzonot Kaah', lat: 20.284177, lng: -87.493362, geopoint: createGeoPoint(20.284177, -87.493362), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 23, name: 'Aldea Tulum', lat: 20.191988, lng: -87.528399, geopoint: createGeoPoint(20.191988, -87.528399), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 24, name: 'La veleta', lat: 20.1990592, lng: -87.4825654, geopoint: createGeoPoint(20.1990592, -87.4825654), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 25, name: 'Aldea Zama', lat: 20.1998048, lng: -87.4568957, geopoint: createGeoPoint(20.1998048, -87.4568957), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 26, name: 'Zamna Tulum', lat: 20.1872837, lng: -87.5299133, geopoint: createGeoPoint(20.1872837, -87.5299133), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
      { id: 27, name: 'Zona hotelera', lat: 20.168589, lng: -87.451285, geopoint: createGeoPoint(20.168589, -87.451285), isActive: true, createdAt: new Date(), updatedAt: new Date(), mxMunicipalityId: 23009 },
    ]);
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    return await queryInterface.bulkDelete('mx_locality_cat', { id: { [Op.gt]: 0 } });
  }
};
