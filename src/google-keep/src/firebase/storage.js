import { storage } from './firebase';

export const uploadMedia = (uid, noteKey, image) => {

	var storRef = storage
		.ref(`images/${uid}/${noteKey}/${image.name}`);

	var uploadTask = storRef
		.put(image);

	uploadTask.on('state_changed', 
		(snapshot) => {

		},
		(error) => {
			console.log(error);
		},
		() => {
			console.log("Uploaded");
		})

	return storage
		.ref(`images/${uid}/${noteKey}/${image.name}`)
		.getDownloadURL();
	

		
};

export const deleteMedia = (url) => {
	var delRef = storage.refFromURL(url);
	delRef.delete();
};