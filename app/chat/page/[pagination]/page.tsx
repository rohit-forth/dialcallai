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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquare, MessageSquareDot, MessagesSquare, Loader2,
    Mail,
    Globe,
    PhoneCall,
    User,
    CalendarClock,
    MessageCircle,
    TrendingUp, 
    Users,
    PhoneOutgoing,
    PhoneMissed,
    Timer,
  
    UserCheck,
    Volume2,
    Phone,
    EyeIcon,
    PhoneIncoming,
 
    Clock, } from "lucide-react"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
const listingData= [
  
    {
      id: 2,
      type: 'chat' as 'chat',
      srNo: '002',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '+1987654321',
      country: 'USA',
      department: 'Support',
      agentName: 'Mike Wilson',
      dateTime: '2024-02-14 10:30 AM',
      status: 'completed',
      chatContent: [
        {
          id: 1,
          content: "Hi, I need help with my account settings",
          sender: 'user',
          timestamp: '10:30 AM'
        },
        {
          id: 2,
          content: "Hello! I'd be happy to help you with your account settings. What specific settings are you trying to adjust?",
          sender: 'agent',
          timestamp: '10:31 AM'
        },
        {
          id: 3,
          content: "I can't find where to change my notification preferences",
          sender: 'user',
          timestamp: '10:32 AM'
        },
        {
          id: 4,
          content: "I'll guide you through that process. First, please go to your account dashboard and click on the 'Settings' tab in the top right corner.",
          sender: 'agent',
          timestamp: '10:33 AM'
        }
      ]
    },{
      id: 2,
      type: 'chat' as 'chat',
      srNo: '002',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '+1987654321',
      country: 'USA',
      department: 'Support',
      agentName: 'Mike Wilson',
      dateTime: '2024-02-14 10:30 AM',
      status: 'completed',
      chatContent: [
        {
          id: 1,
          content: "Hi, I need help with my account settings",
          sender: 'user',
          timestamp: '10:30 AM'
        },
        {
          id: 2,
          content: "Hello! I'd be happy to help you with your account settings. What specific settings are you trying to adjust?",
          sender: 'agent',
          timestamp: '10:31 AM'
        },
        {
          id: 3,
          content: "I can't find where to change my notification preferences",
          sender: 'user',
          timestamp: '10:32 AM'
        },
        {
          id: 4,
          content: "I'll guide you through that process. First, please go to your account dashboard and click on the 'Settings' tab in the top right corner.",
          sender: 'agent',
          timestamp: '10:33 AM'
        }
      ]
    },{
      id: 2,
      type: 'chat' as 'chat',
      srNo: '002',
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '+1987654321',
      country: 'USA',
      department: 'Support',
      agentName: 'Mike Wilson',
      dateTime: '2024-02-14 10:30 AM',
      status: 'completed',
      chatContent: [
        {
          id: 1,
          content: "Hi, I need help with my account settings",
          sender: 'user',
          timestamp: '10:30 AM'
        },
        {
          id: 2,
          content: "Hello! I'd be happy to help you with your account settings. What specific settings are you trying to adjust?",
          sender: 'agent',
          timestamp: '10:31 AM'
        },
        {
          id: 3,
          content: "I can't find where to change my notification preferences",
          sender: 'user',
          timestamp: '10:32 AM'
        },
        {
          id: 4,
          content: "I'll guide you through that process. First, please go to your account dashboard and click on the 'Settings' tab in the top right corner.",
          sender: 'agent',
          timestamp: '10:33 AM'
        }
      ]
    }
  ];

export type Chat = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    phone_number: string
    country: string
  }


type Message = {
    id: number;
    content: string;
    sender: 'user' | 'agent';
    timestamp: string;
  };
  
  type RecordType = {
    id: number;
    type: 'call' | 'chat';
    srNo: string;
    phoneNo?: string;
    dateTime: string;
    status: string;
    transcript?: Message[];
    name?: string;
    email?: string;
    phoneNumber?: string;
    country?: string;
    chatContent?: Message[];
    duration?: string;
    callType?: 'incoming' | 'outgoing';
    department?: string;
    agentName?: string;
    callStatus?: 'completed' | 'missed' | 'ongoing';
  };
  
  const ChatMessage = ({ message }: { message: Message }) => (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
        <Avatar className="w-8 h-8">
          <AvatarImage src={message.sender === 'user' ? '/user-avatar.png' : '/agent-avatar.png'} />
          <AvatarFallback>{message.sender === 'user' ? 'U' : 'A'}</AvatarFallback>
        </Avatar>
        <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg p-3 ${
            message.sender === 'user' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}>
            {message.content}
          </div>
          <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
  
  const TranscriptMessage = ({ message }: { message: Message }) => ( 
    <div className='mb-2'>
    <div className="flex items-center gap-2 mb-1">
      <Badge variant="secondary">
        {message?.sender=="agent" ? "John Doe" : "Sarah Smith"}
      </Badge>
      <span className="text-sm text-muted-foreground">
        {`00:${(1 + 2) * 15}`}
      </span>
    </div>
    <p className="text-gray-600 pl-4">
    {message.content}
    </p>
  </div>
   )
  const SheetContentComponent = ({ isLoading, selectedRecord }: { isLoading: boolean, selectedRecord: RecordType | null }) => {
    if (!selectedRecord) return null;
    
    return (
      <div className="space-y-6">
       {isLoading ? (
                <div className="flex min-h-screen items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : selectedRecord && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg mt-4 font-semibold flex items-center gap-2">
                      {selectedRecord.type === 'call' ? (
                        <>
                          <PhoneCall className="h-5 w-5" />
                          Call Details
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-5 w-5" />
                          Chat Details
                        </>
                      )}
                    </h3>
                    {/* <Badge variant={selectedRecord.type === 'call' ? 'default' : 'secondary'}>
                      {selectedRecord.type.toUpperCase()}
                    </Badge> */}
                  </div>
                  
                  <Separator />
                  
                  {selectedRecord.type === 'call' ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Phone Number</p>
                                <p className="font-medium">{selectedRecord.phoneNo}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Agent</p>
                                <p className="font-medium">{selectedRecord.agentName}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="font-medium">{selectedRecord.duration}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              {selectedRecord.callType === 'incoming' ? (
                                <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
                              )}
                              <div>
                                <p className="text-sm text-muted-foreground">Call Type</p>
                                <p className="font-medium capitalize">{selectedRecord.callType}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          Call Transcript
                        </h4>
                        <ScrollArea className="max-h-[400px] overflow-y-scroll w-full rounded-md border p-4">
                          <div className="whitespace-pre-line">
                          {selectedRecord?.transcript?.map((message:any) => (
                              <TranscriptMessage key={message.id} message={message} />
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{selectedRecord.name}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{selectedRecord.email}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{selectedRecord.phoneNumber}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Country</p>
                                <p className="font-medium">{selectedRecord.country}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
  
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Chat History
                        </h4>
                        <ScrollArea className="max-h-[450px] overflow-y-scroll w-full rounded-md border p-4 bg-background">
                          <div className="space-y-4">
                            {selectedRecord.chatContent?.map((message:any) => (
                              <ChatMessage key={message.id} message={message} />
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  )}

                  <div className="mx-auto w-full flex justify-center">
                    <Link href={selectedRecord.type==="call"?"/call-management/3425/view":"/chat/342/view"}>
                      <Button className="common-btn text-white">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>

               

              )}
      </div>
    );
  };
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

const columns:any = [
    {
      header:"Sr. No.",
      cell: ({ row }: { row: { index: number; original: RecordType } }) => {
        return <span>{row.index + 1}</span>; 
      },
    //   enableSorting: false,
    //   enableHiding: false,
    },
    {
        header:"Chat ID",
        cell: ({ row }: { row: { index: number; original: RecordType } }) => {
          return <span className="text-blue-500">{"#" +row.index + 5228762}</span>; 
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
      accessorKey: "phoneNumber",
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
        header:"Recent Message",
    },
    {
      accessorKey:"chat",
      header:"Chat",
      cell: ({ row }: { row: { index: number; original: RecordType } })=>{
        const [isSheetOpen, setIsSheetOpen] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(false);
        const [selectedRecord, setSelectedRecord] = React.useState(null);
        
        const handleViewRecord = async (record:any) => {
          setSelectedRecord(record);
          setIsLoading(true);
          // Keep the sheet open while loading
          setIsSheetOpen(true);
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          setIsLoading(false);
        };
      
        return (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => handleViewRecord(row.original)}
              >
                <MessagesSquare color='gray'/>
              </Button>
            </SheetTrigger>
            
            <SheetContent
              className="w-[100%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 
              max-w-[100%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[50%]
              max-h-screen overflow-y-auto"
              side="right"
            >
              <SheetContentComponent 
                isLoading={isLoading }
                selectedRecord={selectedRecord }
              />
            </SheetContent>
          </Sheet>
        );
      },
      },
    
    
  
  
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

            <div className="container mx-auto px-6 py-2">
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
                    <DataTable columns={columns} data={listingData} totalItems={data.length}/>
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