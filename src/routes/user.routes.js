import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"
//For file upload on server import upload which consists of middleware function.
import {upload} from '../middlewares/multer.middleware.js'
const router=Router()
//Fields method is used to upload multiple files i.e cover image and avatar
router.route("/register").post(

    upload.fields([
        { 
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

export default router;