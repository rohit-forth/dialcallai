"use client"

import { Icons } from "@/components/icons"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    header:"Sr. No.",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>; 
    },
    enableSorting: false,
    enableHiding: false,
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
            <Link href={`/chat/${123}/view`} ><Icons.Notes /></Link>
    ),
    enableSorting: false,
    enableHiding: false,
  }
  


]
