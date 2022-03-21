import {
  collection,
  type DocumentReference,
  type FirestoreDataConverter,
  type SnapshotOptions,
} from 'firebase/firestore';
import { db } from '..';
import type { Ingredient } from './Ingredient.model';
import type { Meal } from './Meal.model';
import type { Step } from './Step.model';

export interface AtHome extends Meal {
  prepTime?: number;
  serves?: number;
  ingredients?: DocumentReference<Ingredient>[];
  steps?: DocumentReference<Step>[];
}

const atHomeConverter: FirestoreDataConverter<AtHome> = {
  toFirestore: (t: AtHome) => ({ ...t }),
  fromFirestore: ({ data }, { serverTimestamps }: SnapshotOptions) =>
    ({ ...data({ serverTimestamps }) } as AtHome),
};

export const AtHomes = collection(db, 'atHomes').withConverter(atHomeConverter);
