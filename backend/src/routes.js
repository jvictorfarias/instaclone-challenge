import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import multerConfig from './config/multer';
import AvatarController from './app/controllers/AvatarController';

const routes = new Router();
const uploadAvatar = multer(multerConfig);

// Users
routes.post('/users', UserController.store);
routes.get('/users', UserController.show);

// Avatar
routes.post('/avatars', uploadAvatar.single('file'), AvatarController.store);

export default routes;
