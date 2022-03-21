import {
  type FirestoreDataConverter,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '..';
import type { User } from '../models/User.model';
import { AtHomes } from './AtHomes.collections';
import { Restaurants } from './Restaurants.collection';

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: ({ id, nickname }: User) => ({ id, nickname }),
  // Property 'id' is missing in type 'Promise<User>' but required in type 'User'
  // But id is right there!
  // @ts-expect-error
  fromFirestore: async ({ data }): Promise<User> => {
    const { id, nickname } = data() as User;
    const { docs: hDocs } = await getDocs(query(AtHomes, where('userId', '==', id)));
    const { docs: rDocs } = await getDocs(query(Restaurants, where('userId', '==', id)));
    return {
      id,
      nickname,
      atHomes: hDocs.map(({ data }) => data()),
      restaurants: rDocs.map(({ data }) => data()),
    } as User;
  },
};

export const Users = collection(db, 'users').withConverter(userConverter);
