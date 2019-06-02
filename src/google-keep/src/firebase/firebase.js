import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import firebaseConfig from '../config/firebase';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
