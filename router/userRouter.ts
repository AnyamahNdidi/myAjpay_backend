import { Router } from "express";

import { getUser, createUser,deleteOne, getOne, getOneAndUpdate,loginuser,searchUser } from "../Controller/UserControl"
const router = Router()

router.route("/").get(getUser)
router.route("/mysearch/user/one").get(searchUser)
router.route("/create").post(createUser)
router.route("/login").post(loginuser)

export default router;