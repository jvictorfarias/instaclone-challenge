import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import multerConfig from './config/multer';
import AvatarController from './app/controllers/AvatarController';
import PostController from './app/controllers/PostController';

const routes = new Router();

const upload = multer(multerConfig);

// Users
routes.get('/users/:id', UserController.index);
routes.post('/registration', UserController.store);
routes.post('/login', UserController.show);

// Avatar
routes.post('/avatars', upload.single('file'), AvatarController.store);

// Posts
routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);

export default routes;
