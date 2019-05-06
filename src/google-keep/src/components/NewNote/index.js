import React from 'react';
import styled from 'styled-components';

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value,
});
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
var bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';
const NoteBox = styled.div`
	display: block;
	border: 2px solid black;
	border-radius: 1px;
	padding: 1em;
	background: ${bgColor};
`;

class Note extends React.Component {
	constructor() {
		super();
		this.state = {
			newNote: true,
			editNote: false,
			displayNote: false,
			body: '',
		};
	}

	handleNewNote(event) {
		this.setState({ newNote: false, editNote: true });
		// event.preventDefault();
	}

	updateBody(event) {
		this.setState({ body: event.target.value });
	}

	handleSave(event) {
		this.setState({ editNote: false, displayNote: true });
	}

	render() {
		return (
			<div>
				{this.state.newNote && (
					<button onClick={this.handleNewNote.bind(this)}>
						{' '}
						New Note{' '}
					</button>
				)}

				{this.state.editNote && (
					<textarea
						type="text"
						value={this.state.body}
						onChange={this.updateBody.bind(this)}
					/>
				)}

				{this.state.editNote && (
					<button onClick={this.handleSave.bind(this)}>
						{' '}
						Save Note{' '}
					</button>
				)}
				{this.state.displayNote && (
					<NoteBox> {this.state.body} </NoteBox>
				)}
			</div>
		);
	}
}

export default Note;
