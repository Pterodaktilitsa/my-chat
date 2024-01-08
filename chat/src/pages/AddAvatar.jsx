import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import profileAvatar from '../assets/profileAvatar.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { addAvatarRoute } from '../utils/APIRoutes';

export const AddAvatar = () => {
	const navigate = useNavigate();
	const [avatar, setAvatar] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
	};

	useEffect(() => {
		if (!localStorage.getItem('chat-app-user')) navigate('/login');
	}, [navigate]);

	async function setProfilePicture() {
		const user = await JSON.parse(localStorage.getItem('chat-app-user'));

		const avatarData = avatar;
		const response = await axios.post(`${addAvatarRoute}/${user?._id}`, {
			image: avatarData,
		});

		const { data } = response;

		if (data.isSet) {
			user.isAvatarImageSet = true;
			user.avatarImage = data.image;
			localStorage.setItem('chat-app-user', JSON.stringify(user));
			navigate('/');
		} else {
			toast.error('Ошибка создания фото профиля. Попробуйте еще раз', toastOptions);
		}
	}
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const handleInputChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatar(e.target.result);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	return (
		<>
			{isLoading ? (
				<Container>
					<img src={loader} alt="loader" className="loader" />
				</Container>
			) : (
				<Container>
					<FormContainer>
						<div className="title-container">
							<h1>Выбери фото профиля</h1>
						</div>
						<div className="avatar">
							{avatar ? (
								<img src={avatar} alt="profileAvatar" />
							) : (
								<img src={profileAvatar} alt="profileAvatar" />
							)}
							<label htmlFor="input-file">Загрузить фото</label>
							<input
								type="file"
								accept="image/jpeg, image/png, image/jpg"
								id="input-file"
								onChange={handleInputChange}
							/>
						</div>
						<button onClick={setProfilePicture} className="submit-btn">
							Применить
						</button>
					</FormContainer>
				</Container>
			)}
			<ToastContainer />
		</>
	);
};

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background: linear-gradient(white, lightGray);
`;

const FormContainer = styled.div`
	width: 400px;
	background: #ccf6;
	padding: 40px;
	border-radius: 15px;
	text-align: center;
	color: #333;

	.title-container h1 {
		color: slateBlue;
		text-transform: uppercase;
	}

	.avatar img {
		object-fit: cover;
		width: 180px;
		height: 180px;
		border-radius: 50%;
		margin-top: 40px;
		margin-bottom: 30px;
	}

	.avatar label {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10px auto;
		background-color: slateBlue;
		color: white;
		padding: 16px 32px;
		border: none;
		cursor: pointer;
		border-radius: 4px;
		font-size: 16px;
		text-transform: uppercase;
		transition: 0.5s ease-in-out;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
	}

	.avatar input {
		display: none;
	}

	.submit-btn {
		background-color: slateBlue;
		color: white;
		padding: 1rem 2rem;
		border: none;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		text-transform: uppercase;
		transition: 0.5s ease-in-out;
		&:hover {
			background-color: #4e0eff;
		}
	}
`;
