import {Request, Response} from 'express';
import transaction from '../model/transaction';
import axios from 'axios';
import catchAsyncError from '../middlewares/catchAsyncError';
interface transaction{
 id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    sold:boolean;
    dateOfSale:string;

}
export const Create = catchAsyncError(async (req: Request, res: Response) => {
    try {
       const body= req.body;
       function getMonthName(dateString:string) {
        const date = new Date(dateString); 
      
       
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
      
        const monthIndex = date.getMonth(); // Get month index (0 for January, 11 for December)
      
        return months[monthIndex]; // Return the month name
      }
        const create=await Promise.all( body.map((item:transaction)=>{
            return transaction.updateOne(
                
                {id:item.id},
                { $set: {
                title:item.title,
                price:item.price,
                description:item.description,
                category:item.category,
                image:item.image,
                sold:item.sold,
                
                dateOfSale:getMonthName(item.dateOfSale)
            }},
            {upsert:true})
        }))
        res.status(201).json({message: "Transaction created successfully", create});
    } catch (error) {
        res.status(500).json({message: error});
    }
});







   






