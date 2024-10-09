import catchAsyncError from "../middlewares/catchAsyncError";
import transaction from "../model/transaction";
import {Request, Response} from 'express';
export const Read = catchAsyncError(async (req: Request, res: Response) => {
  
    const month=req.params.month;
    const search = (req.query.search as string) || '';
    const page = parseInt(req.query.page as string,10) || 1;
    const perPage = parseInt(req.query.perPage as string, 10) || 10;
    const searchNumber = parseFloat(search);

    
    let filter:any = { dateOfSale: month };
    if (search) {
      filter.$or = 
         [
          { title: { $regex: search, $options: 'i' } },                      
          { description: { $regex: search, $options: 'i' } },  
          ...(isNaN(searchNumber) ? [] : [{ price: searchNumber }])        
        ]
      
    }

    
    const totalRecords = await transaction.countDocuments(filter);

    
    const transactions = await transaction.find(filter)
                 
      .skip((page - 1) * perPage)          
      .limit(perPage);                     

    
    res.status(200).json({
      transactions,
      pagination: {
        currentPage: page,
        perPage,
        totalPages: Math.ceil(totalRecords / perPage),
        totalRecords,
      },
    });
} 
)