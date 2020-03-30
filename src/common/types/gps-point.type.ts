import { IsNumber } from 'class-validator';

export class GpsPoint {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export const gpsPointFromString = (loc?: string): GpsPoint | undefined => {
  if (loc === undefined) {
    return loc;
  }
  const [lat, lon] = loc.split(',');
  const point = new GpsPoint();
  point.lat = parseFloat(lat);
  point.lng = parseFloat(lon);
  return point;
};

export const gpsPointToString = (point?: GpsPoint): string | undefined => (
  point && `${point.lat},${point.lng}`
);
