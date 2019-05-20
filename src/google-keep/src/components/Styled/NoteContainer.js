import styled from 'styled-components';

export default styled.div`
	display: flex;
	margin: 50px;
	border: 0;
	outline: none;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	aligncontent: flex-start;
	justify-content: flex-start;

	& > * {
		color: ${({ theme }) => theme.grey};
	}
`;
