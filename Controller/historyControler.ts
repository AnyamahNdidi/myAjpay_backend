import userModel from "../model/userModel";
import walletModel from "../model/walletModel";
import historyModel from "../model/historyModel";
import { Request, Response } from "express"
import mongoose from "mongoose";


export const createHistory = async (req:Request, res:Response) :Promise<Response> =>
{
    try
    {
        
        
        const user = await  userModel.findById(req.params.myId)
        const mywallet = await walletModel.findById(req.params.myId)

        const otherUser = await userModel.findById(req.params.receiveId)
        const yourWallet = await walletModel.findById(req.params.receiveId)

         const Userhist = await historyModel.create({
            amount:mywallet?.debit,
            sendTo:otherUser?._id,
            receivedFrom:user?._id,
            transactionDescription:""

        })

        mywallet?.history?.push(new mongoose.Types.ObjectId(Userhist?._id))
        mywallet?.save()

        const reciverhist = await historyModel.create({
            amount:mywallet?.debit,
            sendTo:otherUser?._id,
            receivedFrom:user?._id,
            transactionDescription:""

        })

        yourWallet?.history?.push(new mongoose.Types.ObjectId(reciverhist?._id))
        yourWallet?.save()

        return res.status(201).json({message : `history has been made successfully`})


        
    } catch (err)
    {
         return res.status(404).json({ message: `error ${err}` });
    }
}
