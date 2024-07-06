const mongoose=require('mongoose')
const Due_transSchema=mongoose.Schema({
    userid:{
        type:String,
        requied:[true,"user_id is required"]
    },
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    amount:{
        type:Number,
        required:[true,"amount is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    date:{
        type:Date,
         required:[true,'date is required']
    }

},{timestamps:true})
const Due_tran_Model=mongoose.model('due_transaction',Due_transSchema)
module.exports=Due_tran_Model

