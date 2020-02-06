import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
	background-color: #006e90;
	width: 100%;
`;
const Img = styled.img`
	width: 50%;
	src: url('https://prisonerskills-jwn.netlify.com/img/placeholder.com-logo1-green-big.png');
`;

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Div>
				<Img src="https://prisonerskills-jwn.netlify.com/img/placeholder.com-logo1-green-big.png" />
			</Div>
		);
	}
}

export default Header;
