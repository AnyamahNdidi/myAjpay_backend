import { Router } from "express"

const router = Router()
import { createWallet, viewWallter,updateWallet } from "../Controller/walletConroller"

router.route("/:id/create").post(createWallet)
router.route("/:id/userwallet").get(viewWallter)
router.route("/:myId/:receiveId/transfer").patch(updateWallet)

export default router