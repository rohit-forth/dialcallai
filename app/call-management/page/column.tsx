"use client"

import { Icons } from "@/components/icons"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Payment = {
    id: string
    srNo: number
    dateAndTime: string
    transcript: string
    status: "Completed" | "In progress" | "success" | "failed"
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "srNo",
        header: "Sr. No.",
        cell: ({ row }) => <div className="text-blue-500">{row.index + 1}</div>,
    },
    {
        accessorKey: "phone_no",
        header: "Phone No.",
        cell: ({ getValue }) => (
            <div>{getValue() as string}</div>
        ),
    },
    {
        accessorKey: "dateAndTime",
        header: "Date and Time",
        cell: ({ row }) => (
            <div className="">
                {row.original.dateAndTime}
            </div>
        ),
    },
    {
        accessorKey: "transcript",
        header: "Transcript",
        cell: ({ getValue }) => (
            <div>{getValue() as string}</div>
        ),
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ getValue }) => {
    //         const status = getValue() as string
    //         return (
    //             <div className="flex items-center">
    //                 <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
    //                     {status}
    //                 </span>
    //             </div>
    //         )
    //     },
    // },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Link href={`/call-management/${1322}/view`} className="p-2 hover:bg-gray-100 rounded-full">
                    <Icons.Eye />
                </Link>
                {/* <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Icons.MoreHorizontal className="h-4 w-4" />
                </button> */}
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    }
]