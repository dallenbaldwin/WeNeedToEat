import { Collection } from 'fireorm';
import { Meal } from './Meal.entity';

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

@Collection()
export class Restaurant extends Meal {
  price?: Price;
  distance?: number;
  mode?: Mode;
}
