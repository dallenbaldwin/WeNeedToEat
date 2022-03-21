import { UsersCollection, type User } from './../models/User.model';
import {
  setDoc,
  doc,
  type CollectionReference,
  getDocs,
  Query,
  getDoc,
} from 'firebase/firestore';
import type { Base } from '../models/Base.model';

class FirestoreClient<E extends Base> {
  private collection: CollectionReference<E>;

  constructor(collection: CollectionReference<E>) {
    this.collection = collection;
  }

  save = async (entity: Partial<E>): Promise<E> => {
    const _entity = doc(this.collection, entity.id);
    await setDoc(_entity, entity as E);
    return { id: _entity.id, ...entity } as E;
  };

  query = async (query: Query<E>): Promise<E[]> => {
    const { docs } = await getDocs(query);
    return docs.map(({ data }) => data());
  };

  get = async (id: string): Promise<E> => {
    const { data } = await getDoc(doc(this.collection, id));
    return data() as E;
  };
}

export const UsersClient = new FirestoreClient<User>(UsersCollection);
