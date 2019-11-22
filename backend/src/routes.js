import { Router } from 'express';

const routes = new Router();

routes.post('/', (req, res) => {
  return res.status(200).json({ ok: 'ok' });
});

export default routes;
