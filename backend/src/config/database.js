require('dotenv/config');
/**
 * Configuração da aplicação
 */
module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_NAME,
  port: process.env.PG_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true, // Nomenclatura underscored forced
  },
};
