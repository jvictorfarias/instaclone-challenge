import app from './app';

/** Fazendo o servidor escutar na porta definida */
const server = app.server.listen(process.env.PORT);
/** Socket.io escutando o servidor */
app.io.listen(server);
