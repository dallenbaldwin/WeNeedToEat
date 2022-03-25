import type { FirestoreDataConverter } from 'firebase/firestore';
import type { Meal } from './Meal.model';

export enum Price {
  CHEAP = '💲',
  AFFORDABLE = '💲💲',
  PRICEY = '💲💲💲',
  BOUGIE = '💲💲💲💲',
  EXPENSIVE = '💲💲💲💲💲',
}

export interface Restaurant extends Meal {
  price?: Price;
  distance?: number;
  mode?: string;
}

export const restaurantConverter: FirestoreDataConverter<Restaurant> = {
  toFirestore: (restaurant: Restaurant) => ({ ...restaurant }),
  fromFirestore: ({ data }): Restaurant => {
    return { ...data() } as Restaurant;
  },
};
