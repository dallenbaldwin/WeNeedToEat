import type { Base } from './Base.model';
import type { User } from './User.model';

export interface Meal extends Base {
  user: User;
  userId: string;
  name: string;
  tags?: string[];
}
