"use client"
import * as React from "react"
import { ColumnFiltersState, SortingState } from "@tanstack/react-table"
// import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DashboardLayout from "@/app/dashboard/layout"
import PageContainer from "@/components/layout/page-container"
import { DataTable } from "@/components/common/data-table"


// import { Icons } from "@/components/icons"
// import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { EyeIcon } from "lucide-react"
const data: any = [
    {
        id: "101",
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript: "Campaign strategy review"
    },
    {
        id: "101",
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript: "Campaign strategy review"
    },
    

    {
        id: "101",
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript: "Campaign strategy review"
    },
    {
        id: "101",
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript: "Campaign strategy review"
    },
    {
        id: "101",
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript: "Campaign strategy review"
    },
    {
        id: "101",
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript: "Campaign strategy review"
    },
    {
        id: "102",
        job_title: "Senior Designer",
        phone_no: "83456789234",
        status: "Completed",
        created_at: "2024-09-20T08:45:00Z",
        result: 92,
        notes: "Project completed successfully",
        dateAndTime: "20 Sep, 2024, 08:45 AM",
        transcript: "Final design submission"
    },
    {
        id: "103",
        job_title: "UI/UX Designer",
        phone_no: "91234567890",
        status: "In Progress",
        created_at: "2024-11-10T15:30:00Z",
        result: 78,
        notes: "User testing phase ongoing",
        dateAndTime: "10 Nov, 2024, 03:30 PM",
        transcript: "Prototype feedback session"
    },
    {
        id: "104",
        job_title: "Data Scientist",
        phone_no: "99876543210",
        status: "Completed",
        created_at: "2024-08-25T17:00:00Z",
        result: 88,
        notes: "Analysis completed and report submitted",
        dateAndTime: "25 Aug, 2024, 05:00 PM",
        transcript: "Data insights and report"
    },
    {
        id: "105",
        job_title: "Kotlin Developer",
        phone_no: "87654321098",
        status: "In Progress",
        created_at: "2024-07-10T12:00:00Z",
        result: 70,
        notes: "App development in progress",
        dateAndTime: "10 Jul, 2024, 12:00 PM",
        transcript: "Initial app prototype"
    },
    {
        id: "106",
        job_title: "Social Media Manager",
        phone_no: "89901234567",
        status: "Completed",
        created_at: "2024-06-18T14:15:00Z",
        result: 95,
        notes: "Campaign ended successfully",
        dateAndTime: "18 Jun, 2024, 02:15 PM",
        transcript: "Final campaign report"
    },
    {
        id: "107",
        job_title: "Frontend Developer",
        phone_no: "83456712345",
        status: "In Progress",
        created_at: "2024-11-05T09:45:00Z",
        result: 80,
        notes: "Working on UI components",
        dateAndTime: "05 Nov, 2024, 09:45 AM",
        transcript: "Sprint review"
    },
    {
        id: "108",
        job_title: "Backend Developer",
        phone_no: "87678901234",
        status: "Completed",
        created_at: "2024-08-12T16:30:00Z",
        result: 90,
        notes: "API development completed",
        dateAndTime: "12 Aug, 2024, 04:30 PM",
        transcript: "API handover session"
    }
];

export type Payment = {
    id: string
    srNo: number
    dateAndTime: string
    transcript: string
    status: "Completed" | "In progress" | "success" | "failed"
    job_title:string
    created_at:string,
    result:number,
}




function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [activeTab, setActiveTab] = React.useState("active")

    // Filter data based on active tab
    const filteredData = React.useMemo(() => {
        return data.filter((item:any) => {
            if (activeTab === "active") {
                return item.status === "In Progress"
            }
            return item.status === "Completed"
        })
    }, [activeTab])

    //columns defined here only
    const columns: ColumnDef<Payment>[] = [
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

      
        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Link href={`/call-management/${1322}/view`} className="p-2 hover:bg-gray-100 rounded-full">
                    <EyeIcon color='gray'/>
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

    return (
        <PageContainer>
            <div className="container mx-auto p-6">
                <div>
                    <p className="text-lg font-semibold mb-4">Call Management</p>
                </div>
                
                <Tabs defaultValue="active" className="w-full mb-6" onValueChange={setActiveTab}>
                    <TabsList className="grid rounded-2xl h-11 grid-cols-2 p-2">
                        <TabsTrigger className={`p-1 rounded-xl ${activeTab==="active" ?"text-primary":""}`} value="active">Active Calls</TabsTrigger>
                        <TabsTrigger className="p-1 rounded-xl" value="previous">Previous Calls</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="active" className="mt-4">
                        <div className="flex justify-between items-center py-4">
                            <Input
                                placeholder="Search and filter"
                                className="max-w-sm"
                                type="search"
                            />
                        </div>
                        <div className="mx-auto">
                            <DataTable 
                                columns={columns} 
                                data={filteredData} 
                                totalItems={40}
                            />
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="previous" className="mt-4">
                        <div className="flex justify-between items-center py-4">
                            <Input
                                placeholder="Search and filter"
                                className="max-w-sm"
                                type="search"
                            />
                        </div>
                        <div className="mx-auto">
                            <DataTable 
                                columns={columns} 
                                data={filteredData} 
                                totalItems={40}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </PageContainer>
    )
}

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <DataTableDemo />
        </DashboardLayout>
    )
}