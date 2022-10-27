
import mongoose from "mongoose"

interface user
{
    wallet: {};
    amount: number;
    sendTo?: string;
    receivedFrom?: string;
    transactionDescription?: string;
   
}

interface iUser extends user, mongoose.Document{ }

const historyModel    = new mongoose.Schema({

   
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"wallets"
    },
    amount: {
        type: Number,
    },
    sendTo: {
         type: String,
    },
    receivedFrom: {
        type: String,
    },
    transactionDescription: {
        type: String,
    },

    
},
   {timestamps: true}
)

export default mongoose.model<iUser>("histories", historyModel)