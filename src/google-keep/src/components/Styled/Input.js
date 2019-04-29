import styled from 'styled-components';

export default styled.input`
	border: 1px solid ${({ theme }) => theme.lightgrey};
	border-radius: 5px;
	outline: none;
	display: block;
	margin-bottom: 10px;
	padding: 10px;

	width: 100%;
	font-size: 16px;
`;
