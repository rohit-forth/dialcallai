"use client"

import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import imageavtar from '@/assets/images/placeholder.jpg'

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}







export const columns: ColumnDef<Payment>[] = [
    
    {
        id: "select",
        // header: ({ table }) => (
        //   <Checkbox
        //     checked={
        //       table.getIsAllPageRowsSelected() ||
        //       (table.getIsSomePageRowsSelected() && "indeterminate")
        //     }
        //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //     aria-label="Select all"
        //   />
        // ),
        // cell: ({ row }) => (
        //   <Checkbox
        //     checked={row.getIsSelected()}
        //     onCheckedChange={(value) => row.toggleSelected(!!value)}
        //     aria-label="Select row"
        //   />
        // ),
        header: "#",
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "List title",
    },
    {
        accessorKey: "created_at",
        header: "Date created",
    },
    {
        accessorKey: "job_title",
        header: "No. of items",
    },
    {
        header: 'Last update',
        accessorKey: 'status',
        // cell: ({ getValue }) => (
        //     <span className="status-pill">{getValue() as string}</span>
        // ),
    },
    //   {
    //     accessorKey: "result",
    //     header: "Results found",
    //   },
    {
        accessorKey: "Shared with",
        cell: ({ row }) => (
            <div className="flex items-center">
                <div className="flex -space-x-0.5 mr-5">
                    <Avatar>
                        <AvatarImage src={imageavtar.src} alt="User 1" />
                        <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src={imageavtar.src} alt="User 2" />
                        <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src={imageavtar.src} alt="User 3" />
                        <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                </div>
                <Icons.Threedoteicon />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    }
    
]
