
import mongoose from "mongoose"

interface user
{
    user: {};
    totalbalance: number;
    token: number;
    credit?: number;
    debit?: number;
    paymentDescription?: string;
    history?:{}[]
}

interface iUser extends user, mongoose.Document{ }

const walletModel    = new mongoose.Schema({

    user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
    },
    history: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref:"histories"
       } 
    ],
    totalbalance: {
        type: Number,
    },
    token: {
         type: Number,
    },
    credit: {
        type: Number,
    },
    debit: {
        type: Number,
    },
    paymentDescription: {
        type: String,
    },

    
},
   {timestamps: true}
)

export default mongoose.model<iUser>("wallets", walletModel)