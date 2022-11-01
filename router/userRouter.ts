import { Router } from "express";

import { getUser, createUser,deleteOne, getOne, getOneAndUpdate,loginuser,searchUser, verifyUser,forgetPassword,resetPassword } from "../Controller/UserControl"
const router = Router()

router.route("/").get(getUser)
router.route("/mysearch/user/one").get(searchUser)
router.route("/create").post(createUser)
router.route("/login").post(loginuser)
router.route("/:id").get(verifyUser)
router.route("/forgot").post(forgetPassword);
router.route("/reset/:id").post(resetPassword);

export default router;