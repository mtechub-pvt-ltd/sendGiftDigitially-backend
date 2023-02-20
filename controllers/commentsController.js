const commentsModel = require("../models/commentsModel");
const mongoose = require("mongoose");

exports.addComment = async (req,res)=>{
    try{
        const gift_receive_id = req.body.gift_receive_id;
        const comment_by  = req.body.comment_by;
        const user_id = req.body.user_id;
        const comment_text = req.body.comment_text;

        const savedComment = new commentsModel({
            _id:mongoose.Types.ObjectId(),
            gift_receive_id:gift_receive_id,
            comment_by:comment_by,
            user_id:user_id,
            comment_text:comment_text
        })

        const result = await savedComment.save();

        if(result){
            res.json({
                message: "comment has been saved successfully",
                result : result,
                status:true,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "comment could not be saved successfully",
                result:null,
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error while saving comment",
            status:false,
            error:err.message
        })
    }
}

exports.getAllSavedComments = async (req,res)=>{
    try{
        const result = await commentsModel.find({}).populate("gift_receive_id").populate("user_id");
        if(result){
            res.json({
                message: "All Saved Comments fetched successfully",
                result: result,
                status:true,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "Could not fetch comments",
                result: null , 
                status:false,
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred while fetching comments",
            error: err.message,
            status:false
        })
    }
}

exports.getCommentsOfSpecificGift = async (req,res)=>{
    try{
        const gift_receive_id = req.query.gift_receive_id;
        const result = await commentsModel.find({gift_receive_id: gift_receive_id}).populate("gift_receive_id");
        
        if(result){
            res.json({
                message: "Comments of this received gift has been fetched",
                result: result,
                statusCode: 201,
                status:true
            })
        }
        else{
            res.json({
                message: "Comments could not be fetched",
                result:null,
                status:false,
            })
        }

    }
    catch(err){
        res.json({
            message: "Error",
            status:false,
            error:err.message
        })
    }
}

exports.deleteComment = async (req,res)=>{
    try{
        const comment_id = req.query.comment_id;
        const result = await commentsModel.deleteOne({_id:comment_id});

        if(result.deletedCount>0){
            res.json({
                message: "Comment Deleted successfully",
                status:true,
                result: result
            })
        }
        else{
            res.json({
                message: "Comment Deleted successfully",
                status:false,
                result: result
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            error: err.message,
            status:false,
        })
    }
}

exports.updateComment = async (req,res)=>{
    try{
        const comment_id= req.body.comment_id;
        const gift_receive_id = req.body.gift_receive_id;
        const comment_by  = req.body.comment_by;
        const user_id = req.body.user_id;
        const comment_text = req.body.comment_text;

        const result = await commentsModel.findByIdAndUpdate({_id:comment_id} 
            ,
            {
                gift_receive_id:gift_receive_id,
                comment_by:comment_by,
                user_id:user_id,
                comment_text:comment_text
            },
            {
                new:true,
                runValidators:true,
            }
            )

            if(result){
                res.json({
                    message:"comment has been updated successfully",
                    result:result,
                    status:true,

                })
            } 
            else{
                res.json({
                    message : "could not update comment",
                    result:result,
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