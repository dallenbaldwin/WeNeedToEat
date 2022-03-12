import { Meal } from './Meal.entity';

export class Ingredient {
  id!: string;
  name!: string;
  quantity?: number;
  measure?: string;
}

export class Step {
  id!: string;
  number!: number;
  description!: number;
}

export class AtHome extends Meal {
  prepTime?: number;
  serves?: number;
  ingredients?: Ingredient[];
  steps?: Step[];
}
