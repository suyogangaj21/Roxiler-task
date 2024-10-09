import catchAsyncError from "../middlewares/catchAsyncError";
import transaction from "../model/transaction";
import {Request, Response} from 'express';
export const pieChart=catchAsyncError(async(req:Request,res:Response)=>{
    const {month}=req.params;
    if (!month) {
      return res.status(400).json("Month is required");
  }
  const categories = await transaction.aggregate([
    {
        $match: {
            dateOfSale: month 
        }
    },
    {
        $group: {
            _id: '$category',
            itemCount: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            category: '$_id', 
            itemCount: 1 
        }
    }
  ]);
  if (categories.length === 0) {
    return res.status(200).json({ message: "No categories found for this month" });
  }
   return res.status(200).json(categories);
  })