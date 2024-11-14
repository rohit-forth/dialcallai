"use client"

import * as React from "react"
import { ColumnFiltersState, SortingState, } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/app/dashboard/layout"
import PageContainer from "@/components/layout/page-container"
import { DataTable } from "../data-table"
import { columns } from "../column"
import { Icons } from "@/components/icons"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarImage } from "@/components/ui/avatar"
import imageavtar from '@/assets/images/placeholder.jpg'
import imageavtar1 from '@/assets/images/gladiator2.png'



const data: any = [
    {
        id: "234234234",
        job_title: "Social Media Assistant",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',
        status: "No answer",
        created_at: "15 minutes",
        result: 20,
        notes: 'dfsj',
    },
    {
        id: "234234234",
        job_title: "Senior Designer",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',
        status: "No answer",
        created_at: "15 minutes",
        result: 20,
        notes: "20 May, 2024"
    },
    {
        id: "234234234",
        job_title: "UI/UX Designer",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',

        status: "LVM",
        created_at: "15 minutes",
        result: 20,
        notes: "20 May, 2024"
    },
    {
        id: "234234234",
        job_title: "Data Science",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',

        status: "Running",
        created_at: "21 Oct, 2024, 08:20PM",
        result: 20,
        notes: "20 May, 2024"
    },
    {
        id: "234234234",
        job_title: "Kotlin Developer",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',

        status: "Email",
        created_at: "20 May, 2024",
        result: 20,
        notes: "20 May, 2024"
    },
    {
        id: "234234234",
        job_title: "Social Media Assistant",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',

        status: "Calling",
        created_at: "20 May, 2024",
        result: 20,
        notes: "20 May, 2024"
    },
    {
        id: "234234234",
        job_title: "Social Media Assistant",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',
        status: "Running",
        created_at: "15 minutes",
        result: 20,
    },
    {
        id: "234234234",
        job_title: "Social Media Assistant",
        company: 'Gladitor LTD',
        location: "Canberra",
        salary: '$100k - $150k pa',
        day_listed: '15 days',
        contact_info: 'view',
        status: "LVM",
        created_at: "15 minutes",
        result: 20,
        notes: "20 May, 2024"
    },
]


export type Payment = {
    id: string
    job_title: string
    status: "Completed" | "In progress" | "success" | "failed"
    created_at: string
    result: number
    notes: any
}



function DataTableDemo() {


    return (
        <PageContainer>
            <div className="grid grid-cols-12 gap-4">
                {/* Left Section (8 columns) */}
                <div className="col-span-12 lg:col-span-8">
                    <div>
                        <p className="text-2xl font-semibold">List 1</p>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <Input
                            placeholder="Search and filter"
                            className="max-w-sm"
                            type="search"
                        />
                        <div className="flex justify-between items-center gap-4">
                            <Button variant="default">
                                <Checkbox className="me-2" /> Selected
                            </Button>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <DataTable columns={columns} data={data} totalItems={40} />
                    </div>
                </div>
                {/* Right Section (4 columns) */}
                <div className="lg:col-span-4 col-span-12">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <header className="bg-white p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Avatar className="w-10 h-10 rounded-full">
                                    <AvatarImage
                                        src={imageavtar1.src}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </Avatar>
                                <div>
                                    <h1 className="text-xl bg-white font-bold">Notes</h1>
                                    <h1 className="text-sm	font-normal">Gladier  LTD.</h1>
                                    <p className="text-sm flex items-center">
                                        <span className="mr-3 text-gray-500">
                                            <Icons.Timer />
                                        </span>
                                        Last update 3 days ago
                                    </p>
                                </div>
                            </div>
                        </header>
                        {/* Main Content */}
                        <main className="flex-grow overflow-auto p-4 bg-[#F1F6FF]">
                            <div className="space-y-6">
                                {/* Comment Block 1 */}
                                <div className="flex items-start space-x-4">
                                    <Avatar className="rounded-full">
                                        <AvatarImage
                                            src={imageavtar.src}
                                            alt="User 1"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </Avatar>
                                    <div className="max-w-[80%]">
                                        <div className="flex justify-between items-center">
                                            <div className="font-semibold	text-base	text-black">Jenny Wilson</div>
                                            <p className="text-xs text-gray-500">Today 5:10 </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg">
                                            <p className="text-sm text-black break-words font-normal leading-5		">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Avatar className="rounded-full">
                                        <AvatarImage
                                            src={imageavtar.src}
                                            alt="User 1"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </Avatar>
                                    <div className="max-w-[80%]">
                                        <div className="flex justify-between items-center">
                                            <div className="font-semibold	text-base	text-black">Jenny Wilson</div>
                                            <p className="text-xs text-gray-500">Today 5:00 </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg mt-2">
                                            <p className="text-sm text-black break-words font-normal leading-5		">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Comment Block 2 */}
                                <div className="flex items-start justify-end space-x-4">
                                    <div className="max-w-[80%]">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500">Today 5:01 </p>
                                        </div>
                                        <div className="bg-[#323452] p-3 rounded-lg text-left">
                                            <p className="text-sm text-white break-words font-normal	leading-5	">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        {/* Input Section Fixed at Bottom */}
                        <div className="bg-[#F1F6FF] p-4 ">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 h-14 bg-white"
                                    placeholder="Write a comment..."
                                />
                                <Button className="bg-[#323452] text-white px-4 py-2 rounded-lg ">
                                    <Icons.SendIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </PageContainer>
    )
}

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <DataTableDemo />
        </DashboardLayout>
    );
}