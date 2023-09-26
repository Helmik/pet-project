import { Request } from 'express';
import { Sequelize } from 'sequelize-typescript';

import { LANGUAGES } from '../../../common/utils/consts';

export function getLngFromHeaders(request: Request): string {
	const { lng } = request.headers;
  return lng ? lng.toString() : LANGUAGES.default;
}

export function createGeoPoint(lat: number, lng: number) {
  const point = createGeoPointObject(lat, lng);
  return Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(point));
}

export function createGeoPointObject(lat: number, lng: number) {
  return {
    type: 'Point',
    coordinates: [lng, lat],
    crs: { type: 'name', properties: { name: 'EPSG:4326' } }
  };
}
