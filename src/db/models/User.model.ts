import type { Restaurant } from './Restaurant.model';
import type { DocumentReference } from 'firebase/firestore';
import type { AtHome } from './AtHome.model';
import type { Base } from './Base.model';

export interface User extends Base {
  nickname?: string;
  atHomes?: AtHome[];
  restaurants?: Restaurant[];
}
