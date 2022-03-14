import { getFirestore, doc, setDoc, getDoc, collection } from 'firebase/firestore';
import type { SnapshotOptions, DocumentSnapshot } from 'firebase/firestore';

export class FirebaseClient {
  // can I get the class of the class name that extends this class?
  save = (): this => {
    return {} as this;
  };
  find = (): this => {
    return {} as this;
  };
  update = (): this => {
    return {} as this;
  };
  remove = (): { id: string } => {
    return { id: 'null' };
  };
  findMany = (): this[] => {
    return [{} as this];
  };

  private converter = {
    toFirestore: (t: this) => ({ ...t }),
    fromFirestore: ({ data }: DocumentSnapshot, { serverTimestamps }: SnapshotOptions) =>
      ({ ...data({ serverTimestamps }) } as this),
  };
}
