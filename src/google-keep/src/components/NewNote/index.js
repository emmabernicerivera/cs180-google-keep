import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import Popup from 'reactjs-popup';
import { format } from 'date-fns';
import { CirclePicker } from 'react-color';

import { db, messenger } from '../../firebase';
import Submit from '../Styled/Submit';
import Input from '../Styled/Input';
import Title from '../Styled/Title';
import NoteContainer from '../Styled/NoteContainer';

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value,
});

const NoteBox = styled.div`
	display: block;
	background: ${props => props.background};
	border-radius: 5px;
	word-wrap: break-word;
	margin: 8px;
	border: solid;
	border-width: thin;
	width: 200px;
	padding: 15px;
	position: relative;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: box-shadow 0.2s;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	font-family: sans-serif;
	font-size: 16px;
`;
const Button = styled.div`
	padding: 10px;
	border: 2px solid ${({ theme }) => theme.lightgrey};
	width: 70%;
	margin: 0 auto;
	border-radius: 5px;
	outline: none;
	transition: 0.2s all ease-in;
	color: ${({ theme }) => theme.grey};
	font-size: 16px;

	cursor: pointer;

	&:disabled {
		background: #43a047;
	}
`;

const ListItem = styled.li`
	text-decoration: ${props => (props.checked ? 'line-through' : 'none')};
`;

export class Notes extends React.Component {
	state = {
		notes: [],
	};

	constructor(props) {
		super(props);
		this.updateNote = this.updateNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);
	}

	fetchNotes = () => {
		db.onceGetNotes(this.props.uid, this.props.email).then(notes => {
			this.setState({ notes });
		});
	};

	componentDidMount() {
		this.fetchNotes();
	}

	updateNote = (index, note) => {
		let copyArr = this.state.notes.slice();
		copyArr[index] = {
			...copyArr[index],
			...note,
		};
		this.setState({ notes: copyArr });
	};

	addNote() {
		this.setState({
			notes: [
				...this.state.notes,
				{
					body: '',
					dueDate: new Date().toISOString(),
					color: '#ffeb3b',
					checklist: [],
					users: [],
				},
			],
		});
	}

	deleteNote = index => {
		let notes = this.state.notes;
		notes.splice(index, 1);
		this.setState({ notes });
	};

	render() {
		var list = this.state.notes.map((note, i) => {
			return (
				<Note
					uid={this.props.uid}
					index={i}
					{...note}
					updateNote={this.updateNote}
					deleteNote={this.deleteNote}
					noteKey={note.key}
					fetchNotes={this.fetchNotes}
				/>
			);
		});
		return (
			<div style={{ width: '100%', height: '65%' }}>
				<Button onClick={this.addNote.bind(this)}> Add Note </Button>
				<NoteContainer>{list}</NoteContainer>
			</div>
		);
	}
}

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.state = {
			newNote: props.body == '',
			editNote: props.body == '',
			displayNote: props.body != '',
			body: props.body,
			dueDate: props.dueDate,
			color: props.color,
			checklist: props.checklist || [],
			users: props.users || [],
		};
	}

	openModal() {
		this.setState({ open: true });
	}
	closeModal() {
		this.setState({ open: false });
	}

	updateColor(color) {
		this.setState({ color: color.hex });
		this.props.updateNote(this.props.index, { color: color.hex });
	}

	updateDueDate(dueDate) {
		this.setState({
			dueDate: dueDate && dueDate.toISOString(),
		});
		this.props.updateNote(this.props.index, {
			dueDate: dueDate && dueDate.toISOString(),
		});
	}

	addUser() {
		this.setState({
			users: [...this.state.users, ''],
		});
	}

	updateUser(event) {
		const userList = this.state.users;
		userList[userList.length - 1] = event.target.value;
		this.setState({ users: userList });
	}

	addChecklistItem() {
		this.setState({
			checklist: [
				...this.state.checklist,
				{
					checked: false,
					text: '',
				},
			],
		});
	}

	updateCheckListItem(listItem, index) {
		const checklist = this.state.checklist;
		checklist[index] = listItem;
		this.setState({ checklist });
	}

	updateBody(event) {
		this.setState({ body: event.target.value });
		this.props.updateNote(this.props.index, { body: event.target.value });
	}

	handleSave(event) {
		if (this.state.newNote) {
			this.setState({
				newNote: false,
				editNote: false,
				displayNote: true,
			});
			db.doCreateNote(this.props.uid, {
				body: this.state.body,
				dueDate: this.state.dueDate,
				color: this.state.color,
				checklist: this.state.checklist || [],
				users: this.state.users || [],
			});
		} else {
			this.setState({ editNote: false, displayNote: true });
			const update = {
				body: this.state.body,
				dueDate: this.state.dueDate,
				color: this.state.color,
				checklist: this.state.checklist || [],
				users: this.state.users || [],
			};
			db.updateNote(this.props.uid, this.props.noteKey, update);
		}
		messenger.doSendMessage(
			`Your note is due at: ${format(
				new Date(this.state.dueDate),
				'MMMM D, YYYY h:mm aa'
			)}`
		);
		this.props.fetchNotes();
	}

	handleDelete(event) {
		this.props.deleteNote(this.props.index);
		db.deleteNote(this.props.uid, this.props.noteKey);
	}

	editNote(event) {
		this.setState({ editNote: true, displayNote: false });
	}

	render() {
		return (
			<div>
				{this.state.editNote && (
					<div>
						<Input
							type="text"
							value={this.state.body}
							onChange={this.updateBody.bind(this)}
						/>
						{this.state.checklist &&
							this.state.checklist.map((listItem, index) => {
								return (
									<div>
										<input
											type="checkbox"
											checked={listItem.checked}
											onChange={event => {
												this.updateCheckListItem(
													{
														...listItem,
														checked:
															event.target
																.checked,
													},
													index
												);
											}}
										/>
										<label>
											<input
												type="text"
												value={listItem.text}
												onChange={event => {
													this.updateCheckListItem(
														{
															...listItem,
															text:
																event.target
																	.value,
														},
														index
													);
												}}
											/>
										</label>
									</div>
								);
							})}
						<DatePicker
							selected={
								this.state.dueDate &&
								new Date(this.state.dueDate)
							}
							onChange={this.updateDueDate.bind(this)}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							dateFormat="MMMM d, yyyy h:mm aa"
							timeCaption="time"
						/>
						<CirclePicker
							onChangeComplete={this.updateColor.bind(this)}
						/>
						<Button onClick={this.addChecklistItem.bind(this)}>
							Add Checklist Item
						</Button>
						<Button
							onClick={() => {
								this.openModal();
								this.addUser();
							}}
						>
							Add User
						</Button>
						<Popup
							open={this.state.open}
							closeOnDocumentClick
							onClose={this.closeModal}
						>
							<div className="modal">
								<a className="close" onClick={this.closeModal}>
									&times;
								</a>
								<Title> Add User </Title>
								<p> Enter users email: </p>
								<input
									type="text"
									value={
										this.state.users[
											this.state.users.length - 1
										]
									}
									onChange={this.updateUser.bind(this)}
								/>
								<button
									onClick={() => {
										this.closeModal();
										messenger.doSendMessage(
											`Shared note with ${
												this.state.users[
													this.state.users.length - 1
												]
											}!`
										);
									}}
								>
									Save
								</button>
							</div>
						</Popup>
						<Button onClick={this.handleSave.bind(this)}>
							Save
						</Button>
						<Button onClick={this.handleDelete.bind(this)}>
							Delete
						</Button>
					</div>
				)}
				{this.state.displayNote && (
					<NoteBox
						onClick={this.editNote.bind(this)}
						background={this.state.color}
					>
						<p>{this.state.body}</p>
						<ul>
							{this.state.checklist &&
								this.state.checklist.map(listItem => {
									return (
										<ListItem checked={listItem.checked}>
											{listItem.text}
										</ListItem>
									);
								})}
						</ul>
						{this.state.dueDate && (
							<small>
								{format(
									new Date(this.state.dueDate),
									'MMMM D, YYYY h:mm aa'
								)}
							</small>
						)}
					</NoteBox>
				)}
			</div>
		);
	}
}

export default Note;
