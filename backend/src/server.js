import app from './app';

const server = app.server.listen(process.env.PORT);
app.io.listen(server);
