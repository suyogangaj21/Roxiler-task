import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface stats{
   totalSaleAmount: number,
    totalSold: number,
    totalNotSold: number
}
const Statistics:React.FC<{month:string}> = ({month}) => {
    const [data,setData]=useState<stats|null>(null)
    const {toast}=useToast();
  useEffect(() => {
   const fetchData=async()=>{
    try {
        const data=await axios({
            method:"GET",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/Statistics/${month}`,
        })
        setData(data.data);
    } catch (error) {
        console.log(error)
        toast({
            title:"Error occured"
        })
    }
   }
   fetchData();
    
  }, [month])
  

  return (
    <div className="bg-amber-200 text-black p-5 m-5 text-xl">
        <h2 className="text-center text-3xl font-bold p-3 m-1">Statistics-{month}</h2>
       <div className="flex  gap-32  ">
        <p className="text-left">Total Sale</p>
        <p className="ml-[80px]">{data?.totalSaleAmount}</p>
       </div>
       <div className="flex  gap-32">
        <p className="text-left">Total Sold itmes</p>
        <p className="ml-[30px]">{data?.totalSold}</p>
       </div>
       <div className="flex gap-32">
        <p>Total not Sold items</p>
        <p>{data?.totalNotSold}</p>
       </div>
    </div>
  )
}

export default Statistics
