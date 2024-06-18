// const mongoose=require('mongoose')
// const transactionSchema=mongoose.Schema({
//     userid:{
//         type:String,
//         required:[true,'user_id is required']
//     },
//     amount:{
//         type:Number,
//         required:[true,'amount is required']

//     },
//     type:{
//         type:String,
//         required:[true,'category is required']
//     },
//     category:{
//         type:String,
//         required:[true,'category is required']
//     },
//     mode:{
//         type:String,
//         required:[true,'mode is required']
//     }

//     ,
//     refereces:{
//         type:String,
//         required:[true,'description is required']
//     },
//     description:{
//         type:String,
//         required:[true,'description is required']
//     },
//     date:{
//         type:String,
//          required:[true,'date is required']
//     },
//     time:{
//         type:String,
//         required:[true,'time is required']
//     },
    
// },{timestamps:true})
// const transactionModel=mongoose.model('transaction',transactionSchema)
// module.exports=transactionModel