import multer from 'multer';

//File save krana ka liya middleware use hota ha multer.. there are different options too like express-files

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  //const upload will consist of middleware function which multer return with storage
  //configured setting
  export const upload = multer(
    storage,
)

