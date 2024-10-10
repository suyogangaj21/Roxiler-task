

import { Toaster } from "@/components/ui/toaster";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';
import Statistics from './components/Statistics';
import TableData from "./components/Table";
import BarGraph from "./components/BarGraph";
function App() {
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const [month, setMonth] = useState<string>("March");
  return (
     <div>
      <div className='p-3 m-4 '>
      <Select onValueChange={(e) => {setMonth(e)}} defaultValue="March">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.label}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      <TableData month={month}/>

      <Statistics month={month}/>
      <BarGraph month={month}/>
      </div>
     <Toaster />
     
     </div>
     )
}

export default App;
