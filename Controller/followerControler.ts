import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import follwerModel from "../model/follower";
import follwingModel from "../model/flowwingModel";
import { Request, Response } from "express";
import crypto from "crypto";


export const follow = async (req: Request, res: Response): Promise<Response> =>
{
    try
    {
        await userModel.findByIdAndUpdate(
            req.params.followingID,
            {
                $push  : {following: req.params.followerID}
            },
            {new:true}
            
        )
        await userModel.findByIdAndUpdate(
            req.params.followerID,
            {
                $push  : {followers: req.params.followingID}
            },
            {new:true}
            
        )

        return res.status(200).json({mesage:"starting following"})
        
    } catch (err)
    {
         return res.status(404).json({message: `error ${err}`});
    }
    
}
export const unfollow = async (req: Request, res: Response): Promise<Response> =>
{
    try
    {
          await userModel.findByIdAndUpdate(
            req.params.followingID,
            {
                $pull  : {following: req.params.followerID}
            },
            {new:true}
            
        )
        await userModel.findByIdAndUpdate(
            req.params.followerID,
            {
                $pull  : {followers: req.params.followingID}
            },
            {new:true}
            
        )

        return res.status(200).json({mesage:"stop following"})
        
    } catch (err)
    {
         return res.status(404).json({message: `error ${err}`});
    }
    
}