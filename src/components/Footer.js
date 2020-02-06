import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	background-color: #006e90;
	width: 100%;
	color: #c0c0c0;
`;
const Img = styled.img`
	width: 50%;
	src: url('img/logo.png');
`;
const Hr = styled.hr`
	border-top: 3px solid #99c24d;
	background: transparent;
`;
class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Div>
				<Hr />© Prisoner Skills 2020
			</Div>
		);
	}
}

export default Footer;
