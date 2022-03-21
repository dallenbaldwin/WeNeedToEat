import { Restaurants, type Restaurant } from './Restaurant.model';
import {
  collection,
  getDocs,
  query,
  where,
  type FirestoreDataConverter,
} from 'firebase/firestore';
import { AtHomes, type AtHome } from './AtHome.model';
import type { Base } from './Base.model';
import { db } from '..';

export interface User extends Base {
  nickname?: string;
  atHomes?: AtHome[];
  restaurants?: Restaurant[];
}

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

export const UsersCollection = collection(db, 'users').withConverter(userConverter);
