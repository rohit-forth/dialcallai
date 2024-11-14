"use client"

import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { AvatarImage } from "@radix-ui/react-avatar"
import { ColumnDef } from "@tanstack/react-table"
import imageavtar from '@/assets/images/placeholder.jpg'
import { useState } from "react"

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
        header: "Job ID",
    },
    {
        accessorKey: "job_title",
        header: "Job title",
    },
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "salary",
        header: "Salary",
    },
    {
        accessorKey: "day_listed",
        header: "Day listed",
    },
    {
        accessorKey: "Contact info",
        cell: ({ row }) => (
            <div className="flex items-center">
                <div className="flex -space-x-0.5 mr-1">   
                <Icons.Eye />
                </div>
                view
            </div>
        ),
    },
    {
        accessorKey: "Shared with",
        cell: ({ row }) => (
            <div className="flex items-center">
                <div className="flex -space-x-0.5 mr-1">
                    <Avatar>
                        <AvatarImage src={imageavtar.src} alt="User 1" />
                        {/* <AvatarFallback>U1</AvatarFallback> */}
                    </Avatar>
                    <Avatar>
                        <AvatarImage src={imageavtar.src} alt="User 2" />
                    </Avatar>
                    <Avatar>
                        <AvatarImage src={imageavtar.src} alt="User 3" />
                    </Avatar>
                </div>
                <Icons.PlusIcon />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }) => (
            <span className="status-pill">{getValue() as string}</span>
        ),
    },
    {
        accessorKey: "notes",
        cell: ({ row }) => {
            const [isClicked, setIsClicked] = useState(false); 
            
            const handleClick = () => {
                setIsClicked((prevState) => !prevState); 
                console.log(`Notes clicked: ${!isClicked}`); 
            };

            return (
                <div className="flex">

                    <span className="mr-3">
                        <button  onClick={handleClick} >
                        <Icons.Notes/> 
                        </button>
                    </span>
                    <Icons.Threedoteicon />
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    }

]


            
