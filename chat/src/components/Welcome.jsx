import React from 'react';
import styled from 'styled-components';
import Pterodactyl from '../assets/pterodactyl.png';

export const Welcome = ({ currentUser }) => {
	return (
		<Container>
			<img src={Pterodactyl} alt="Pterodactyl" />
			<h1>
				Добро пожаловать, <span>{currentUser.username}!</span>
			</h1>
			<h3>Пожалуйста, выбери чат, чтобы начать общаться</h3>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: slateBlue;
	img {
		height: 20rem;
	}
	span {
		color: #32cd32;
	}
`;
