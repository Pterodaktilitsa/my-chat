import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import messageRoute from './routes/messagesRoute.js';
const app = express();
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoute);

 app.use('/', express.static(path.join(__dirname, '.', 'chat')));
 const indexPath = path.join(__dirname, '.', 'chat', 'index.html');
 app.get('*', (_, res) => {
		res.sendFile(indexPath);
 });

const server = app.listen(8080, () => {
	console.log(`Server Started on Port ${8080}`);
});

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('DB Connection Successfull');
	})
	.catch((err) => {
		console.log(err.message);
	});


const io = new Server(server, {
	cors: {
		origin: '*',
		credentials: true,
	},
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-recieve', data.message);
		}
	});
});
