import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBsdHou2qEloHuDIE_0Hj0eYQZMxFgJC6U',
	authDomain: 'store-app-ca5d0.firebaseapp.com',
	projectId: 'store-app-ca5d0',
	storageBucket: 'store-app-ca5d0.appspot.com',
	messagingSenderId: '913556140518',
	appId: '1:913556140518:web:bdc6f005d1a49437b46627',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
