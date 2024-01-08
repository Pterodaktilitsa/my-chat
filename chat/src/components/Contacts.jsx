import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Contacts = ({ contacts, currentUser, changeChat }) => {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	useEffect(() => {
		if (currentUser) {
			setCurrentUserName(currentUser.username);
			setCurrentUserImage(currentUser.avatarImage);
		}
	}, [currentUser, contacts]);
	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};
	return (
		<>
			{currentUserImage && currentUserName && (
				<Container>
					<div className="brand">
						<h3>pterodaktilitsa chat</h3>
					</div>
					<div className="contacts">
						{(contacts || []).map((contact, index) => {
							return (
								<div
									key={contact._id}
									className={`contact ${
										index === currentSelected ? 'selected' : ''
									}`}
									onClick={() => changeCurrentChat(index, contact)}
								>
									<div className="avatar">
										<img src={contact.avatarImage} alt="avatar" />
									</div>
									<div className="username">
										<h3>{contact.username}</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className="current-user">
						<div className="avatar">
							<img src={currentUserImage} alt="avatar" />
						</div>
						<div className="username">
							<h2>{currentUserName}</h2>
						</div>
					</div>
				</Container>
			)}
		</>
	);
};
const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		h3 {
			color: slateBlue;
			text-transform: uppercase;
		}
	}
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #d6ccff;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.contact {
			background-color: #ccf6;
			min-height: 5rem;
			cursor: pointer;
			width: 90%;
			border-radius: 0.2rem;
			padding: 0.4rem;
			display: flex;
			gap: 1rem;
			align-items: center;
			transition: 0.5s ease-in-out;
			.avatar {
				img {
					height: 3rem;
					width: 3rem;
					max-width: 100%;
					border-radius: 50%;
					object-fit: cover;
				}
			}
			.username {
				h3 {
					color: slateBlue;
				}
			}
		}
		.selected {
			background-color: #d6ccff;
		}
	}

	.current-user {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		.avatar {
			img {
				height: 5rem;
				width: 5rem;
				max-width: 100%;
				border-radius: 50%;
				object-fit: cover;
			}
		}
		.username {
			h2 {
				color: slateBlue;
			}
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			gap: 0.5rem;
			.username {
				h2 {
					font-size: 1rem;
				}
			}
		}
	}
`;
