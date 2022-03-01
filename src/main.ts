import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};
initializeApp(firebaseConfig);

import App from './App.vue';
import router from './router';
import './index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
