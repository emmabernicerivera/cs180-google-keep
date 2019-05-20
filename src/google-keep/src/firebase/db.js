import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({
		username,
		email,
	});

export const onceGetUsers = () => db.ref('users').once('value');

export const doCreateNote = (uid, note) => db.ref(`notes/${uid}`).push(note);

export const onceGetNotes = uid =>
	db
		.ref(`notes/${uid}`)
		.once('value')
		.then(snap => snap.val());

export const updateNote = (uid, noteKey, update) => {
	db.ref(`notes/${uid}/${noteKey}/`).update(update);
};

// Other db APIs ...
