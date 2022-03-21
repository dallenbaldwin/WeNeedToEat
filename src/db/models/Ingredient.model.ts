import type { Base } from './Base.model';

export interface Ingredient extends Base {
  name: string;
  quantity?: number;
  measure?: string;
}
