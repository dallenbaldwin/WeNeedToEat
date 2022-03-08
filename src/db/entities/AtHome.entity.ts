import { Collection, SubCollection, type ISubCollection } from 'fireorm';
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

@Collection()
export class AtHome extends Meal {
  prepTime?: number;
  serves?: number;

  @SubCollection(Ingredient)
  ingredients?: ISubCollection<Ingredient>;

  @SubCollection(Step)
  steps?: ISubCollection<Step>;
}
