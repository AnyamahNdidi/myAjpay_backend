
import mongoose from "mongoose"

interface user
{
    user: {};

}

interface iUser extends user, mongoose.Document{ }

const followerModel    = new mongoose.Schema({

    user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
       } 
    
},
   {timestamps: true}
)

export default mongoose.model<iUser>("followers", followerModel)