const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler};
//Higher order function are those which accept function as parameter or as a variable
//const asynhandler=()=>{}
//const asynhandler=(fn)=>async()=>{}

//wrapper code

// const asyncHandler=(fn)=>async(req,res,next)=>{
//   try {
//      await fn(req,res,next)
//   } catch (error) {
//     res.status(err.code||500).json({
//         status:false,
//         message:err.message,
//     })
//   }
// }


