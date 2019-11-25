import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
/**
 * Configuração do Multer
 */
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'files'),
    filename: (req, file, cb) => {
      /** Encriptando o nome dos arquivos antes de salvar no DB */
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
