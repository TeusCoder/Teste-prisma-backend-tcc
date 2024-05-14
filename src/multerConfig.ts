import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //pega a data + um numero aleatorio
      const extensao = path.extname(file.originalname)
      cb(null, file.originalname + '-' + uniqueSuffix + extensao); //junta o nome original com a data e o numero
    }
  })
  
  export const upload = multer({storage: storage})
 