
const mongoose=require("mongoose")

const giftBox= new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:String,
    yt_link:String,
    image:String,
    message:String,
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"giftType"
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    giftFor:{
        type:String,
        enum:["login" , 'subscribed' , 'guest']
    }
},{
    timestamps: true
}) 



module.exports = mongoose.model("giftBox" , giftBox);