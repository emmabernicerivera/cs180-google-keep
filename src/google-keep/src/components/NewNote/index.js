import React from 'react';
import styled from 'styled-components';

const updateByPropertyName = (propertyName, value) => () => ({
	[propertyName]: value,
});
var r = Math.floor(Math.random() * 256);
var g = Math.floor(Math.random() * 256);
var b = Math.floor(Math.random() * 256);
var bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';
const NoteBox = styled.span`
	display: inline-block;
	border: 2px solid black;
	border-radius: 1px;
	padding: 1em;
	background: ${bgColor};
	max-width: 150px;
	word-wrap: break-word	
`;

export class Notes extends React.Component {
	constructor(props){
		super(props);
		this.updateText = this.updateText.bind(this);
	}
	state = {
		notes : [
		]
	}


	updateText = (index, body) => {
		let copyArr = this.state.notes.slice();
		copyArr[index] = body;
		this.setState({notes : copyArr})
	}

	addNote() {
		this.setState({notes : [...this.state.notes, ""]});
	}

	render(){
		var list = this.state.notes.map((element, i) => {
			return (
				<Note index={i} body={element} updateText={this.updateText}/>
			);
		});
		return  (
			<p>{list}<button onClick={this.addNote.bind(this)}> Add Note </button></p>     

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
			body: '',
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
	}

	editNote(event) {
		this.setState({ editNote: true, displayNote: false });
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
					<NoteBox onClick={this.editNote.bind(this)}> {this.state.body} </NoteBox>
				)}

			</div>
		);
	}
}

export default Note;

