import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

export const Register = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
	};
	useEffect(() => {
		if (localStorage.getItem('chat-app-user')) {
			navigate('/');
		}
	}, [navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			console.log('in validation', registerRoute);
			const { password, username, email } = values;
			const { data } = await axios.post(registerRoute, {
				username,
				email,
				password,
			});
			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}
			if (data.status === true) {
				localStorage.setItem('chat-app-user', JSON.stringify(data.user));
				navigate('/');
			}
		}
	};

	const handleValidation = () => {
		const { password, confirmPassword, username, email } = values;
		if (password !== confirmPassword) {
			toast.error(
				'пароль и пароль для подтверждения должны совпадать',
				toastOptions,
			);
			return false;
		} else if (username.length < 3) {
			toast.error('имя пользователя должно быть более 3 символов', toastOptions);
			return false;
		} else if (password.length < 8) {
			toast.error(
				'пароль пользователя должен быть равен или больше 8 символов',
				toastOptions,
			);
			return false;
		} else if (email === '') {
			toast.error('необходимо ввести email', toastOptions);
			return false;
		}
		return true;
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	return (
		<>
			<FormContainer>
				<form onSubmit={(event) => handleSubmit(event)}>
					<div className="brand">
						<h1>pterodaktilitsa chat</h1>
					</div>
					<input
						type="text"
						placeholder="Имя пользователя"
						name="username"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="Пароль"
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					<input
						type="password"
						placeholder="Подтверждение пароля"
						name="confirmPassword"
						onChange={(e) => handleChange(e)}
					/>
					<button type="submit">Создать нового пользователя</button>
					<span>
						Уже есть аккаунт? <Link to="/login">Авторизироваться</Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
};

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background: linear-gradient(white, lightGray);

	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;

		h1 {
			color: slateBlue;
			text-transform: uppercase;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #ccf6;
		border-radius: 1rem;
		padding: 3rem 5rem;
		input {
			background-color: transparent;
			padding: 1rem;
			border: 0.5px solid #4e0eff;
			border-radius: 0.4rem;
			color: slateBlue;
			width: 100%;
			font-size: 1rem;
			&:focus {
				border: 0.1rem solid #997af0;
				outline: none;
			}
		}
		button {
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
		span {
			text-transform: uppercase;
			color: darkSlateBlue;
			a {
				color: #4e0eff;
				font-weight: bold;
				text-decoration: none;
				font-weight: bold;
			}
		}
	}
`;
