import firebase from 'firebase/app';
import 'firebase/messaging';

export const doSendMessage = async message => {
	const messaging = firebase.messaging();
	await messaging.requestPermission();
	const token = await messaging.getToken();
	fetch('http://localhost:8000/', {
		method: 'POST',
		body: JSON.stringify({
			notification: {
				body: message,
			},
			token,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(function(response) {
		console.log(response);
	});
};
