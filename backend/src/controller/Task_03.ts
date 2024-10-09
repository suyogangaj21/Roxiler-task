import catchAsyncError from "../middlewares/catchAsyncError";
import transaction from "../model/transaction";
import {Request, Response} from 'express';
export const statistics = catchAsyncError( async(req:Request,res:Response)=>{
    const {month}=req.params;
    if(!month){
      return res.status(403).json("Month Required")
    }
    const sale= await transaction.aggregate(
      [{
        $match:{
          dateOfSale:{$eq:month},
          sold:true
        }},
        {
          $group:{
            _id:null,
            totalAmount:{$sum:'$price'},
          },
        }
      ]
    )
    // const soldItems = await transaction.find({
    //   dateOfSale: month,
    //   sold: true,
    // });
    // console.log("Sold Items:", soldItems);
    // const prices = soldItems.map(item => item.price);
    // console.log("Prices of Sold Items:", prices);

   
    // const totalAmount = soldItems.reduce((sum, item) => sum + item.price, 0);
    // console.log("Total Amount Calculated:", totalAmount);
    
    const totalSold=await transaction.countDocuments({
      dateOfSale:{$eq:month}
      ,sold:true,
    })

    const totalNotSold=await transaction.countDocuments({
      dateOfSale:{$eq:month}
      ,sold:false
    })
    const totalSaleAmount = sale.length ? sale[0].totalAmount : 0;
    res.status(200).json({
      totalSaleAmount: totalSaleAmount,
      totalSold,
      totalNotSold,
    });

}
)