import styled from 'styled-components';

export default styled.button`
	display: block;
	margin: 0 auto;
	width: 110%;
	padding: 10px;
	border: 0;
	border-radius: 5px;
	outline: none;

	background: #00e676;
	transition: 0.2s all ease-in;
	color: white;
	font-size: 16px;

	cursor: pointer;

	&:disabled {
		background: #43a047;
	}
`;
