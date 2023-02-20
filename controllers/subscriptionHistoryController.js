
const mongoose = require("mongoose")
const subscriptionHistoryModel = require("../models/subscriptionHistoryModel")
const ObjectId = require("mongodb").ObjectId;


exports.createSubscriptionHistory = async(req,res)=>{
    try{
        const subscription_id= req.body.subscription_id;
        const month_name = req.body.month_name;
        const transaction_id= req.body.transaction_id;
        const transaction_status= req.body.transaction_status;
        

        const subscriptionHistory = new subscriptionHistoryModel({
            _id:mongoose.Types.ObjectId(),
            subscription_id:subscription_id,
            month_name:month_name,
            transaction_id:transaction_id,
            transaction_status:transaction_status,
            user_id:req.body.user_id,
        })

        const result= await subscriptionHistory.save();
        
        if(result){
            res.json({
                message: "Subscription history saved successfully",
                result:result,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "could not save subscription history",
                result:result,
                statusCode:400
            })
        }

        

    }
    catch(err){
        res.json({
            message: "Error occurred while saving subscription history",
            error:err.message
        })
    }
}



exports.getAllSubscriptionsHistories = async (req,res)=>{
    try{
        const result=await subscriptionHistoryModel.find({}).populate("subscription_id");

        if(result){
            res.json({
                message: "result",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not find result",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message,
            statusCode:500
        })
    }
}

exports.getSubscriptionHistoryById = async (req,res)=>{
    try{
        const subscriptionHistoryId= req.params.subscriptionHistoryId;
        const result=await subscriptionHistoryModel.findOne({_id:subscriptionHistoryId}).populate("subscription_id");

        if(result){
            res.json({
                message: "result",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not find result  with this id",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while fetching",
            error:err.message,
            statusCode:500
        })
    }
}

exports.deleteSubscriptionHistory = async(req,res)=>{

    try{
        const subscriptionHistoryId= req.params.subscriptionHistoryId;
        const result= await subscriptionHistoryModel.deleteOne({_id:subscriptionHistoryId})

        if(result.deletedCount>0){
            res.json({
                message: "record deleted",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not delete result with this id",
                result:result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while deleting",
            error:err.message,
            statusCode:500
        })
    }
       
}

exports.updateSubscriptionHistory = async(req,res)=>{

    try{
    const subscriptionHistoryId= req.body.subscriptionHistoryId;
    const subscription_id= req.body.subscription_id;
    const month_name = req.body.month_name;
    const transaction_id= req.body.transaction_id;
    const transaction_status= req.body.transaction_status;

    const result = await subscriptionHistoryModel.findOneAndUpdate({_id:subscriptionHistoryId}
        ,{
            subscription_id:subscription_id,
            month_name:month_name,
            transaction_id:transaction_id,
            transaction_status:transaction_status,
            user_id:req.body.user_id,
        } ,
        {
            new:true,
        }  
        )

        
        if(result){
            res.json({
                message: "record updated successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not update record",
                result:result,
                statusCode:404
            })
        }

    }
    catch(err){
        res.json(err)
    }
    

}
 
exports.getSubscriptionHistoryByUserId = async (req,res)=>{
    try{
        let user_id = req.query.user_id;
    
        const result = await subscriptionHistoryModel.find({user_id: user_id}).populate("subscription_id");


        if(result){
            res.json({
                message: "subscription history of this user fetched",
                result:result,
                status:true,
            })
        }
        else{
            res.json({
                message: "could not fetch any details",
                status:false,
            })
        }

    }
    catch(err){
        res.json({
            message: "Error",
            error:err.message,
            status:false
        })
    }

}
