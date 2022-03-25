import { FirestoreClient } from './FirestoreClient';
import { userConverter, type User } from './models/User.model';
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { atHomeConverter, type AtHome } from './models/AtHome.model';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};
// initialize firebase resources
initializeApp(firebaseConfig);

export const UsersClient = new FirestoreClient<User>('users', userConverter);
export const AtHomesClient = new FirestoreClient<AtHome>('atHomes', atHomeConverter);
