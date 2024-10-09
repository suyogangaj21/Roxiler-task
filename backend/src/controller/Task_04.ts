import catchAsyncError from "../middlewares/catchAsyncError";
import transaction from "../model/transaction";
import {Request, Response} from 'express';
export const barChart = catchAsyncError(async(req:Request,res:Response)=>{
    const {month}=req.params;
    if(!month){
      return res.status(402).json("Month Required")
    }
     const priceRangeData=await transaction.aggregate([
      {
        $match:{
          dateOfSale:{$eq:month}
        }
      },
      {
        $bucket:{
          groupBy:'$price',
          boundaries:[0, 101, 201, 301, 401, 501, 601, 701, 801, 901],
          default:'901-above',
          output:{
            count:{$sum:1},
          }
        }
      }
     ])
     res.status(200).json({
      priceRange:priceRangeData,
     })
})
