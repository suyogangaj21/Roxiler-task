import  { useEffect, useState } from 'react'

import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

interface price{
    count:number
    _id:number
}
const BarGraph = ({month}:{month:string}) => {
    const [barData, setBarData] = useState<number[] | []>([]);
useEffect(() => {
  const fetchData=async()=>
  {
    const data=await axios({
        method:"GET",
         url: `${import.meta.env.VITE_BACKEND_URL}/api/bar-graph/${month}`
    })
   
    const priceRange=data.data.priceRange;
    const barData:price[]=[];
    priceRange.map((item:price)=>{
        barData.push(item)
    })
    setBarData(barData.map((item)=>item.count))
  }
  fetchData();
}, [month])

 const chartSetting={
  yAxis: [
    {
      label: 'count',
    },
  ],
  xAxis: [
    {
      label: 'price range',
    }
  ]
 }
  return (
    <div className='text-black bg-white'>
      <h2 className='text-center text-4xl font-bold'>Bar Chart Stats-{month}</h2>
      <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['0-100','101-200','201-300','301-400','401-500','501-600','601-700','701-800','801-900','901-above'],
          scaleType: 'band',
          ...chartSetting.xAxis[0]
        },
      ]}
      series={[
        {
          data: barData  ,
        },
      ]}
      width={700}
      height={500}
      yAxis={chartSetting.yAxis}
    
    />
    
    </div>
  )
}

export default BarGraph
