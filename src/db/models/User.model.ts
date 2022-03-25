import type { Restaurant } from './Restaurant.model';
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore';
import type { AtHome } from './AtHome.model';
import type { Base } from './Base.model';
import { Logger } from '@/utils/logger';

export interface User extends Base {
  nickname?: string;
  atHomes?: AtHome[];
  restaurants?: Restaurant[];
}

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User): DocumentData => ({ ...user }),
  fromFirestore: ({ data }): User => ({ ...(data() as User) }),
};
