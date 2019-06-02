//import firebaseConfig from '../config/firebase';

importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js');

firebase.initializeApp({
	apiKey: 'AIzaSyAwTGRJC9tQF0hK4mWJH__mp_skXg6LMSA',
	authDomain: 'cs180keep-38e61.firebaseapp.com',
	databaseURL: 'https://cs180keep-38e61.firebaseio.com',
	projectId: 'cs180keep-38e61',
	storageBucket: 'cs180keep-38e61.appspot.com',
	messagingSenderId: '756736958325',
});

const messaging = firebase.messaging();

// // Get Instance ID token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// messaging
// 	.getToken()
// 	.then(function(currentToken) {
// 		if (currentToken) {
// 			sendTokenToServer(currentToken);
// 			updateUIForPushEnabled(currentToken);
// 		} else {
// 			// Show permission request.
// 			console.log(
// 				'No Instance ID token available. Request permission to generate one.'
// 			);
// 			// Show permission UI.
// 			updateUIForPushPermissionRequired();
// 			setTokenSentToServer(false);
// 		}
// 	})
// 	.catch(function(err) {
// 		console.log('An error occurred while retrieving token. ', err);
// 		showToken('Error retrieving Instance ID token. ', err);
// 		setTokenSentToServer(false);
// 	});

// // Callback fired if Instance ID token is updated.
// messaging.onTokenRefresh(function() {
// 	messaging
// 		.getToken()
// 		.then(function(refreshedToken) {
// 			console.log('Token refreshed.');
// 			// Indicate that the new Instance ID token has not yet been sent to the
// 			// app server.
// 			setTokenSentToServer(false);
// 			// Send Instance ID token to app server.
// 			sendTokenToServer(refreshedToken);
// 			// ...
// 		})
// 		.catch(function(err) {
// 			console.log('Unable to retrieve refreshed token ', err);
// 			showToken('Unable to retrieve refreshed token ', err);
// 		});
// });
