import React from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value,
});
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
var bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';
const NoteBox = styled.span`
	display: inline-block;
	background: #f2e379;
	word-wrap: break-word;
	border: solid;
	border-width: thin;
	width: 200px;
	padding: 15px;
	margin-bottom: 10px;
	position: relative;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: box-shadow 0.2s;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	font-family: sans-serif;
	font-size: 16px;
`;
const Button = styled.span`
	border: outset;
	border-radius: 5px;
	padding: 12px 12px;
	font-size: 16px;
	text-transform: uppercase;
	cursor: pointer;
	color: white;
	background-color: #2196f3;
	box-shadow: 0 0 4px #999;
	outline: none;
`;
export class Notes extends React.Component {
	state = {
		notes: [],
	};

	constructor(props) {
		super(props);
		this.updateText = this.updateText.bind(this);
	}

	componentDidMount() {
		db.onceGetNotes(this.props.uid).then(data => {
			const notesData = Object.values(data.val());
			const notes = notesData.map(note => note.note);
			this.setState({ notes });
		});
	}

	updateText = (index, body) => {
		let copyArr = this.state.notes.slice();
		copyArr[index] = body;
		this.setState({ notes: copyArr });
	};

	addNote() {
		this.setState({ notes: [...this.state.notes, ''] });
	}

	render() {
		var list = this.state.notes.map((element, i) => {
			return (
				<Note
					uid={this.props.uid}
					index={i}
					body={element}
					updateText={this.updateText}
				/>
			);
		});
		return (
			<p>
				{list}
				<Button onClick={this.addNote.bind(this)}> Add Note </Button>
			</p>
		);
	}
}

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newNote: false,
			editNote: true,
			displayNote: false,
			body: props.body || '',
		};
	}

	handleNewNote(event) {
		this.setState({ newNote: false, editNote: true });
		// event.preventDefault();
	}

	updateBody(event) {
		this.setState({ body: event.target.value });
		this.props.updateText(this.props.index, event.target.value);
	}

	handleSave(event) {
		this.setState({ editNote: false, displayNote: true });
		db.doCreateNote(this.props.uid, this.state.body);
	}

	editNote(event) {
		this.setState({ editNote: true, displayNote: false });
	}

	render() {
		return (
			<div>
				{this.state.newNote && (
					<Button onClick={this.handleNewNote.bind(this)}>
						{' '}
						New Note{' '}
					</Button>
				)}

				{this.state.editNote && (
					<textarea
						type="text"
						value={this.state.body}
						onChange={this.updateBody.bind(this)}
					/>
				)}

				{this.state.editNote && (
					<Button onClick={this.handleSave.bind(this)}>
						Save Note{' '}
					</Button>
				)}
				{this.state.displayNote && (
					<NoteBox onClick={this.editNote.bind(this)}>
						{' '}
						{this.state.body}{' '}
					</NoteBox>
				)}
			</div>
		);
	}
}

export default Note;
