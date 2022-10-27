import mongoose from "mongoose";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import { Request, Response } from "express";
import crypto from "crypto";

export const getUser = async (req: Request, res: Response) :Promise<Response> =>
{
    try
    {
        const alluser = await userModel.find().sort({createdAt: -1})

        return res.status(200).json({
            message: "done",
            data:alluser
        })
    } catch (err)
    {
       return res.status(404).json({message: `error ${err}`});
    }
}


export const getOne = async (req: Request, res: Response) :Promise<Response> =>
{
    try
    {
        const oneuser = await userModel.findById(req.params.id)
        return res.status(200).json({
            message: "user Found",
            data:oneuser
        })
    } catch (err)
    {
       return res.status(404).json({message: `error ${err}`});
    }
}



export const getOneAndUpdate = async (req: Request, res: Response) :Promise<Response> =>
{
    try
    {
        const  {userName, fullName} = req.body
        const oneupdate = await userModel.findByIdAndUpdate(
            req.params.user,
            { userName, fullName },
            {new:true}
        )
        return res.status(200).json({
            message: "update successfully",
            data:oneupdate
        })
    } catch (err)
    {
       return res.status(404).json({message: `error ${err}`});
    }
}


export const deleteOne = async (req: Request, res: Response) :Promise<Response> =>
{
    try
    {
        
        const onedelete = await userModel.findByIdAndRemove(req.params.id)
        return res.status(200).json({
            message: "delete successfully",
            
        })
    } catch (err)
    {
       return res.status(404).json({message: `error ${err}`});
    }
}

export const createUser = async (req: Request, res: Response) :Promise<Response> =>
{
    try
    {
        const {
            userName,
            fullName,
            email,
            password,
            accestoken
        } = req.body

        const numb = crypto.randomBytes(4).toString("binary")

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const onecreated = await userModel.create({
            userName,
            fullName,
            email,
            password: hash,
            accestoken: 100 + Math.floor(Math.random() * 1000),
            accountNumber : Math.floor(Math.random() * Date.now()/100),
        })
        return res.status(200).json({
            message: "user created successfully",
            data:onecreated
            
        })
    } catch (err)
    {
       return res.status(404).json({message: `error ${err}`});
    }
}

export const loginuser = async (req: Request, res: Response) :Promise<Response> =>
{
    try
    {
        const {email, password} = req.body

        const findUser = await userModel.findOne({ email })
        if (findUser)
        {
            const checkpassword = await bcrypt.compare(password, findUser.password);
            if (checkpassword)
            {
                const { ...info } = findUser._doc;
                return res.status(200).json({
                    message: `welcome back ${findUser.fullName}`,
                    data:info
                }) 
            } else
            {
                 return res.status(404).json({message: `incorrect pasword`});
            }
        } else
        {
             return res.status(404).json({message: `user not fonnd`});
        }
       
    } catch (err)
    {
       return res.status(404).json({message: `error ${err}`});
    }
}

export const searchUser = async(req:Request, res:Response) :Promise<Response>=>{
    // const keyword = req.query.search  ?
    // {
    //   $or:[
    //     {fullName : {$regex:req.query.search, $options:"i"}},
    //     {accestoken : {$regex:req.query.search, $options:'i'}},
    //   ]
    // } : {}
  // without token verification you use the comment one
  // const user = await User.find(keyword)
  const newquery =  req.query
  const user = await userModel.find(newquery)
   return res.status(200).send(user)
}


