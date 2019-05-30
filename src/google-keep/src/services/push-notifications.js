import firebase from 'firebase/app';

export const askForPermissionToReceiveNotifications = async () => {
	try {
		const messaging = firebase.messaging();
		await messaging.requestPermission();
		const token = await messaging.getToken();
		console.log('token do usuário:', token);
		return token;
	} catch (error) {
		console.error(error);
	}
};
