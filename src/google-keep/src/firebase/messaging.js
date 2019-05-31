import firebase from 'firebase/app';
import 'firebase/messaging';

export const doSendMessage = message => {
	firebase
		.messaging()
		.getToken()
		.then(token => {
			if (token) {
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
			}
		});
};
