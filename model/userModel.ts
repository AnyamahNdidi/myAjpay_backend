
import mongoose from "mongoose"

interface user
{
    userName: string;
    fullName: string;
    email: string;
    password: string;
    accestoken: number;
    verify: boolean;
    accountNumber: number;
    followers: {}[];
    following: {}[];
    wallet: {}[];
    _doc:{}

}

interface iUser extends user, mongoose.Document{ }

const userModel = new mongoose.Schema({
    userName:{
        type: String
    },
    fullName: {
        type:String
    },
    email: {
        type: String,
        Unique:true
    },
    verify: {
        type: Boolean,
        
    },
    accestoken: {
        type:Number
    },
    accountNumber: {
        type:Number
    },
    password: {
        type:String
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"followers"
       } 
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"followings"
       } 
    ],
    wallet: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"wallets"
       } 
    ]
},
   {timestamps: true}
)

export default mongoose.model<iUser>("users", userModel)