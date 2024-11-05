const mongoose=require('mongoose')
const transSchema=mongoose.Schema({
    userid:{
        type:String,
        required:[true,'user_id is required']
    },
   
    name:{
        type:String,
        required:[true,'name is required']

    },
    amount:{
        type:Number,
        required:[true,'amount is required']

    },
    type:{
        type:String,
        required:[true,'type is required']
    },
    category:{
        type:String,
        required:[true,'category is required']
    },
    mode:{
        type:String,
        required:[true,'mode is required']
    }

    ,
    references:{
        type:String,
        required:[true,' references is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    date:{
        type:Date,
         required:[true,'date is required']
    },
   
    
   
    
},{timestamps:true})
const transModel=mongoose.model('tranzaction',transSchema)
module.exports=transModel