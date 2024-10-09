import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function TableData() {
  const [data, setData] = useState<transactions | null>(null);
  
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [month, setMonth] = useState<string>("March");
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
            perPage: 10,
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

  return (
    <div className="p-1 ">
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <Select onValueChange={(e) => setMonth(e)} defaultValue="March">
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
            <TableHead>No</TableHead>
            <TableHead className="w-[100px]">Category</TableHead>
            <TableHead>title</TableHead>
            <TableHead>description</TableHead>
            <TableHead>sold</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.transactions.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.sold ? "Yes" : "No"}</TableCell>
                <TableCell className="text-right">{item.price}</TableCell>
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
