import multer from 'multer'
import { ensureTempDirExists } from '../utils/tempDir.js';


const storage = multer.diskStorage({
  destination:function (req,file,cb) {
    const tempDir = ensureTempDirExists();
    cb(null, tempDir);
  },
  filename: function (req,file,cb) {
    cb(null,file.originalname)
    
  }
})

export const upload = multer({
  storage
})