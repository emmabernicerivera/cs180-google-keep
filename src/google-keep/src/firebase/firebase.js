import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';

import firebaseConfig from '../config/firebase';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
	navigator.serviceWorker
		.register('./service-worker.js')
		.then(registration => {
			firebase.messaging().useServiceWorker(registration);
		});
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
