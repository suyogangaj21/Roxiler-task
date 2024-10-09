import catchAsyncError from "../middlewares/catchAsyncError";
import transaction from "../model/transaction";
import {Request, Response} from 'express';
import axios from "axios";
export const combined= catchAsyncError(async (req:Request, res:Response) => {
    const { month } = req.params;

    if (!month) {
        return res.status(400).json("Month is required");
    }

  
        
        const statisticsResponse = await axios.get(`${process.env.BACKEND_URL}/api/statistics/${month}`);
        const statisticsData = statisticsResponse.data;

        const barChartResponse = await axios.get(`${process.env.BACKEND_URL}/api/bar-graph/${month}`);
        const barChartData = barChartResponse.data;

       const pieChartResponse = await axios.get(`${process.env.BACKEND_URL}/api/pie-chart/${month}`);
        const pieChartData = pieChartResponse.data;

        const combinedResponse = {
            ...statisticsData,
            barChartData,
            pieChartData,
        };

        res.status(200).json(combinedResponse);

    
    });