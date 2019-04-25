import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
	font-size: 50px;
`;

const Title = props => <StyledTitle {...props}>{props.children}</StyledTitle>;

export default Title;
