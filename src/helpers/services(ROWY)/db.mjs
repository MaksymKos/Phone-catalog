import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

let db = false;

export const getDb = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: 'AIzaSyDKgq1ZGuFHRtUT-5MsPHIvsEI0zWwcYeI',
      authDomain: 'phone-catalog-c6e42.firebaseapp.com',
      projectId: 'phone-catalog-c6e42',
      storageBucket: 'phone-catalog-c6e42.appspot.com',
      messagingSenderId: '918192982008',
      appId: '1:918192982008:web:862827076d288ef1c1f80d',
    };

    const app = initializeApp(firebaseConfig);

    db = getFirestore(app);
  }

  return db;
};
