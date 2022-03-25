import type { FirestoreDataConverter } from 'firebase/firestore';
import type { Ingredient } from './Ingredient.model';
import type { Meal } from './Meal.model';
import type { Step } from './Step.model';

export interface AtHome extends Meal {
  prepTime?: number;
  serves?: number;
  ingredients?: Ingredient[];
  steps?: Step[];
}

export const atHomeConverter: FirestoreDataConverter<AtHome> = {
  toFirestore: ({
    id,
    name,
    userId,
    ingredients,
    prepTime,
    serves,
    steps,
    tags,
  }: AtHome) => ({ id, name, userId, ingredients, prepTime, serves, steps, tags }),
  fromFirestore: ({ data }) => ({ ...data() } as AtHome),
};
