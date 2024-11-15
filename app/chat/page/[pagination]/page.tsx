"use client"
import Link from "next/link"
import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
// import {ColumnFiltersState,SortingState,} from "@tanstack/react-table"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/app/dashboard/layout"
import PageContainer from "@/components/layout/page-container"
import { DataTable } from "@/components/common/data-table"  
//import { columns } from "../column"
import { MessageSquare, MessageSquareDot, MessagesSquare } from "lucide-react"
import { usePathname } from "next/navigation"
export type Chat = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    phone_number: string
    country: string
  }
const data: any = [
    {
        name: "Cameron Williamson",
        email: "c.williamson@gmail.com",
        phone_number: "N/A",
        country: "United States"
    },
  
    {
        name: "Cameron Williamson",
        email: "c.williamson@gmail.com",
        phone_number: "232323234",
        country: "India"
    },

];

const columns: ColumnDef<Chat>[] = [
    {
      header:"Sr. No.",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>; 
      },
    //   enableSorting: false,
    //   enableHiding: false,
    },
  
    {
      accessorKey: "name",
      header: "Name",
    },
    // {
    //   accessorKey: "job_title",
    //   header: "Job title",
    // },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
    },
    // {
    //   accessorKey: "email",
    //   header: "Email",
    // },
  
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey:"chat",
      header:"Chat",
      cell: ({ row }) => (
              <Link href={`/chat/${123}/view`} ><MessagesSquare/></Link>
      ),
      enableSorting: false,
      enableHiding: false,
    }
    
  
  
  ]
export type Payment = {
    id: string
    job_title: string
    status: "Completed" | "In progress" | "success" | "failed"
    created_at:string
    result:number
    updated_at:string
}



function Contact() {


    const pathname = usePathname();

    return (
        <PageContainer>

            <div className="container mx-auto p-6">
                <div>
                    <p className="heading">{"Chat"}</p>
                </div>
                <div className="flex justify-between items-center py-4">
                    <Input
                        placeholder="Search and filter"
                        // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        // onChange={(event) =>
                        //     table.getColumn("email")?.setFilterValue(event.target.value)
                        // }
                        className="max-w-sm"

                        type="search"
                    />
                </div>

                <div className=" mx-auto ">
                    <DataTable columns={columns} data={data} totalItems={data.length}/>
                </div>
                {/* <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div> */}
            </div>
        </PageContainer>
    )
}



export default function DashboardPage() {
    return (
        <DashboardLayout>
            <Contact />
        </DashboardLayout>
    );
}