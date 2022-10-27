import userModel from "../model/userModel";
import walletModel from "../model/walletModel";
import { Request, Response } from "express"
import mongoose from "mongoose";

export const createWallet = async (
  req: Request,
  res: Response
) :Promise<Response> =>
{ 
    try
    {
        // const {
        //     totalbalance,
        //     token,
        //     credit,
        //     debit,
        //     paymentDescription,
        //     history,

        // } = req.body
        const getUser = await userModel.findById(req.params.id);
        const getWallet = await walletModel.create({
            _id: getUser?._id,
            totalbalance: 1000,
            credit: 0,
            debit:0,
            token: getUser?.accestoken,
            paymentDescription:""
            
        });
        getUser?.wallet.push(new mongoose.Types.ObjectId(getWallet?._id))
        getUser?.save()

        return res.status(201).json({
            message: "wallet created",
            data:getWallet
        })
    } catch (err)
    {
        return res.status(404).json({message: `error ${err}`});
    } 

}

export const viewWallter = async (req:Request, res:Response) :Promise<Response> =>
{
    try
    {
        const wallet = await userModel.findById(req.params.id).populate({
            path: "wallet",
            options:{createdAt: -1}
        })
        return res.status(200).json({
            message: "wallet found",
            data:wallet
        })
    } catch (err)
    {
        return res.status(404).json({message: `error ${err}`});
    }
    
}

export const updateWallet = async (req: Request, res:Response) :Promise<Response> =>
{ 
     try
     {
         const {amount, token, paymentDescription} = req.body;
         const user = await  userModel.findById(req.params.myId)
         const mywallet = await walletModel.findById(req.params.myId)

         const yourWallet = await walletModel.findById(req.params.receiveId)
         
         if (user?.accestoken === token)
         {
             await walletModel.findByIdAndUpdate(
                 req.params.myId,
                 {
                     totalbalance: mywallet?.totalbalance! - amount,
                     debit: amount,
                     credit: 0,
                     paymentDescription  
                 },
                 {new:true}
             )

             await walletModel.findByIdAndUpdate(
                 req.params.receiveId,
                 {
                     totalbalance: yourWallet?.totalbalance! + amount,
                     credit: amount,
                     debit: 0,
                     paymentDescription  
                     
                 }
            )

             
         } else
         {
             return res.status(404).json({
                 message: `you enter the wrong token ${token}`
             })
         }

         return res.status(201).json({
             message: `you just transfer ${amount}  successfully `
         })
       
    } catch (err)
    {
       return res.status(404).json({message: `error ${err}`});
    }
    
}