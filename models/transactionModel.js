const mongoose=require('mongoose')
const transactionSchema=mongoose.Schema({
    amount:{
        type:Number,
        required:[true,'amount is required']

    },
    category:{
        type:String,
        required:[true,'category is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    date:{
        type:String,
        required:[true,'date is required']
    },
    time:{
        type:String,
        required:[true,'time is required']
    },
    mode:{
        type:String,
        required:[true,'mode is required']
    }

},{timestamps:true})
const transactionModel=mongoose.model('transacton',transactionSchema)
module.exports=transactionModel