import styled from 'styled-components';

export default styled.div`
	background-image: url('../static/background.jpg');
	background-size: cover;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > * {
		color: ${({ theme }) => theme.grey};
	}
`;
