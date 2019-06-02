import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({
		username,
		email,
	});

export const onceGetUsers = () => db.ref('users').once('value');

// export const getUserByEmail = email =>
// 	db.ref
// 		.child('users')
// 		.orderByChild('email')
// 		.equalTo(email)
// 		.on('value', function(snapshot) {
// 			console.log(snapshot.val());
// 		});

export const doCreateNote = (uid, note) => db.ref(`notes/${uid}`).push(note);

export const onceGetNotes = (uid, email) =>
	db
		.ref(`notes/${uid}`)
		.once('value')
		.then(snap => snap.val())
		.then(data => {
			const uidNotes = Object.keys(data || {}).map(key => ({
				...data[key],
				key,
			}));
			return onceGetCollabNotes(email).then(collabNotes => {
				return collabNotes.concat(uidNotes);
			});
		});

export const onceGetCollabNotes = email =>
	db
		.ref(`notes`)
		.once('value')
		.then(snapshot => {
			const allNotes = snapshot.val();
			if (allNotes == null) {
				return [];
			}
			const userNotes = Object.values(allNotes);
			const notesContents = Object.values(userNotes);
			return notesContents
				.map(note => Object.values(note))
				.flat()
				.filter(note => note.users && note.users.indexOf(email) > -1);
		});

export const updateNote = (uid, noteKey, update) => {
	db.ref(`notes/${uid}/${noteKey}/`).update(update);
};

export const deleteNote = (uid, noteKey) => {
	db.ref(`notes/${uid}/${noteKey}/`).remove();
};
// Other db APIs ...
