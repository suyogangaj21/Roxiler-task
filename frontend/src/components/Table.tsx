import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
export interface transaction {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold: boolean;
  dateOfSale: string;
}
export interface transactions {
  transactions: transaction[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalRecords: number;
  };
}
interface TableDataProps {
  month: string;
}

const TableData:React.FC<TableDataProps>=({month})=> {
  const [data, setData] = useState<transactions | null>(null);
  
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("In");
        console.log(import.meta.env.VITE_BACKEND_URL);
        const res = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_BACKEND_URL}/api/read/${month}`,
          params: {
            page: page,
            search: search,
            perPage: 5,
          },
        });
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, page, month]);

 
  return (
    <div className="p-1 ">
      <div className="flex gap-4 justify-between">
        <h2>Transaction DashBoard</h2>
        <div className="flex gap-4">
        
        
        <div>
        <Input
         placeholder="Search"
          className="w-[150px]"
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        </div>
        </div>
        <div className="flex p-1 gap-4"> 
            <div className="text-foreground pt-2">Page {data?.pagination.currentPage} of {data?.pagination.totalPages}</div>

             { data&&data?.pagination.currentPage > 1 && <Button className="bg-background text-foreground border-2 hover:bg-slate-800" onClick={()=>setPage(data.pagination.currentPage-1)}>Prev</Button>}
                {data&& data?.pagination.currentPage < data?.pagination.totalPages && <Button className="bg-background text-foreground border-2 hover:bg-slate-800" onClick={()=>setPage(data.pagination.currentPage+1)}>Next</Button>}
        </div>
      </div>
      <Table>
        <TableCaption>A list of transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.transactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="text-right">{item.category}</TableCell>
                <TableCell>{item.sold ? "Yes" : "No"}</TableCell>
    
              </TableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}
export default TableData