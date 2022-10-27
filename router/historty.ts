import { Router } from "express"
const router = Router()

import { createHistory } from "../Controller/historyControler"

router.route("/:myId/:receiveId").patch(createHistory)


export default router