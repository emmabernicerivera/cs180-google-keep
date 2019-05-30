import firebaseConfig from '../config/firebase';
import firebase from 'firebase';

importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.0/firebase-messaging.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
