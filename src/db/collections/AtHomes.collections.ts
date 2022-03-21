import {
  type FirestoreDataConverter,
  type SnapshotOptions,
  collection,
} from 'firebase/firestore';
import { db } from '..';
import type { AtHome } from '../models/AtHome.model';

const atHomeConverter: FirestoreDataConverter<AtHome> = {
  toFirestore: (t: AtHome) => ({ ...t }),
  fromFirestore: ({ data }, { serverTimestamps }: SnapshotOptions) =>
    ({ ...data({ serverTimestamps }) } as AtHome),
};

export const AtHomes = collection(db, 'atHomes').withConverter(atHomeConverter);
