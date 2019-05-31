import firebase from 'firebase/app';

import { messenger } from '../firebase';

export const askForPermissionToReceiveNotifications = async () => {
	try {
		const messaging = firebase.messaging();
		await messaging.requestPermission();
		const token = await messaging.getToken();

		messenger.doSendMessage('Hello World!');

		return token;
	} catch (error) {
		console.error(error);
	}
};
