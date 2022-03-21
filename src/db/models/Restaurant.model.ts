import { type FirestoreDataConverter, collection } from 'firebase/firestore';
import { db } from '..';
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

const restaurantConverter: FirestoreDataConverter<Restaurant> = {
  toFirestore: ({ id, name, user, distance, mode, price, tags }: Restaurant) => ({
    id,
    name,
    user: user.id,
    distance,
    mode,
    price,
    tags,
  }),
  fromFirestore: ({ data }) => {
    const { id, name, distance, mode, price, tags } = data() as Restaurant;
    const userId = (data() as Restaurant).user as unknown as string;
    return { id, name, distance, mode, price, tags } as Restaurant;
  },
};

export const Restaurants = collection(db, 'restaurants').withConverter(
  restaurantConverter
);
