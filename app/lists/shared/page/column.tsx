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
        header: "# items",
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
        header : 'Shared by' ,
        accessorKey: "shared_with",
        cell: ({ row }) => (
            <div className="flex items-center">
                <div className="flex -space-x-0.5 mr-5">
                    <Avatar>
                        <AvatarImage src={imageavtar.src} alt="User 1" />
                    </Avatar>
                </div>
                angela@gmail.com
                {/* <Icons.Threedoteicon /> */}
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    } ,
    {
        header: 'Role',
        accessorKey: 'role',
        // cell: ({ getValue }) => (
        //     <span className="status-pill">{getValue() as string}</span>
        // ),
    },

]
