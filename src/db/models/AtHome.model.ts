import type { DocumentReference } from 'firebase/firestore';
import type { Ingredient } from './Ingredient.model';
import type { Meal } from './Meal.model';
import type { Step } from './Step.model';

export interface AtHome extends Meal {
  prepTime?: number;
  serves?: number;
  ingredients?: DocumentReference<Ingredient>[];
  steps?: DocumentReference<Step>[];
}
