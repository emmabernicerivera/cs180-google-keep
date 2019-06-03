import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import firebaseConfig from '../config/firebase';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}


const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export { storage, db, auth };
