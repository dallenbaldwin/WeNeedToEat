import { Logger } from '@/utils/logger';
import type {
  CollectionReference,
  Firestore,
  FirestoreDataConverter,
} from 'firebase/firestore';
import {
  setDoc,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  collection,
  QueryConstraint,
  query,
} from 'firebase/firestore';
import type { Base } from './models/Base.model';

export class FirestoreClient<E extends Base> {
  private collection: CollectionReference<E>;
  private converter: FirestoreDataConverter<E>;
  private name: string;
  private db: Firestore;

  constructor(name: string, converter: FirestoreDataConverter<E>) {
    this.db = getFirestore();
    this.name = name;
    this.converter = converter;
    this.collection = collection(this.db, name).withConverter(converter);
  }

  async save(entity: Partial<E>): Promise<E> {
    try {
      const _entity = doc(this.collection, entity.id);
      await setDoc(_entity, entity as E);
      return { id: _entity.id, ...entity } as E;
    } catch (err) {
      Logger.error(err as Error);
      throw err;
    }
  }

  query = async (...constraints: QueryConstraint[]): Promise<E[]> => {
    try {
      const { docs } = await getDocs(query(this.collection, ...constraints));
      return docs.map(({ data }) => data());
    } catch (err) {
      Logger.error(err as Error);
      throw err;
    }
  };

  async get(id: string): Promise<E> {
    try {
      const { data, exists } = await getDoc(
        doc(this.db, this.name, id).withConverter(this.converter)
      );
      if (!exists()) throw new Error(`Not found in ${this.name}: ${id}`);
      return data() as E;
    } catch (err) {
      Logger.error(err as Error);
      throw err;
    }
  }
}
