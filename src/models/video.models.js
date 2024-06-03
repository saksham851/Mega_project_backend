import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
//This import is used for mongoose aggregation pipeline...

const videoSchema=new Schema(
    {
        videoFile:
        {
            type:String, //Take from cloudanary url
            required:true,
        },
        thumbnail:
        {
          type:String,
          required:true,
        },
        title:
        {
          type:String,
          required:true,
        },
        description:
        {
          type:Number, //from cloudnary url we will get
          required:true,
        },
        views:
        {
          type:Number,
          default:0,
        },
        isPublished:{
            type:Boolean,
            default:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
    }
    ,{timestamps:true})

    

videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model('Video',videoSchema);