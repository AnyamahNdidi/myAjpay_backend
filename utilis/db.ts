import mongoose from "mongoose"

const url: string = "mongodb://localhost/mywallet"

mongoose.connect(url).then(() =>
{
    console.log("DATA BASE HAS BEEN CONNECTED")
}).catch((err) => console.log(err))

export default mongoose;