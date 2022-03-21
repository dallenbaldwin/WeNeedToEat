import {
  type FirestoreDataConverter,
  type SnapshotOptions,
  collection,
  getDoc,
} from 'firebase/firestore';
import { db } from '..';
import type { Restaurant } from '../models/Restaurant.model';
import type { User } from '../models/User.model';

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
