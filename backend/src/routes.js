import { Router } from 'express';
import multer from 'multer';
import UserController from './app/controllers/UserController';
import multerConfig from './config/multer';
import AvatarController from './app/controllers/AvatarController';
import PostController from './app/controllers/PostController';
import LikeController from './app/controllers/LikeController';

const routes = new Router();

const upload = multer(multerConfig);

/** Definição das rodas de usuário */
routes.post('/registration', UserController.store);
routes.post('/login', UserController.show);

/** Definição das rodas de Avatar */
routes.post('/avatars', upload.single('file'), AvatarController.store);

/** Definição das rotas de Posts */
routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);
routes.delete('/posts', PostController.delete);

/** Definição das rotas de Likes */
routes.post('/posts/:id/like', LikeController.store);

export default routes;
