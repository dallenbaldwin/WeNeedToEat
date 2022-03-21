import type { Meal } from './Meal.model';

export enum Price {
  CHEAP = '💲',
  AFFORDABLE = '💲💲',
  PRICEY = '💲💲💲',
  BOUGIE = '💲💲💲💲',
  EXPENSIVE = '💲💲💲💲💲',
}

export enum Mode {
  WALK = 'Walk',
  BIKE = 'Bike',
  SCOOT = 'Scoot',
  SKATE = 'Skate',
  MOTORCYCLE = 'Motorcycle',
  CAR = 'Car',
  BUS = 'Bus',
  RAIL = 'Rail',
  PLANE = 'Plane',
  BOAT = 'Boat',
}

export interface Restaurant extends Meal {
  price?: Price;
  distance?: number;
  mode?: Mode;
}
