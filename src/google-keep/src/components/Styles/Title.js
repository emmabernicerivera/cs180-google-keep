import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
	font-size: 50px;
	font-family: 'Montserrat', sans-serif;
`;

const Title = props => <StyledTitle {...props}>{props.children}</StyledTitle>;

export default Title;
