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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
        id: "101",
        type: 'call',
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript:[
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
            },
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
          ],
    },
    {
        id: "101",
        type: 'call',
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript:[
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
            },
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
          ],
    },


    {
        id: "101",
        type: 'call',
        job_title: "Social Media Assistant",
        phone_no: "87587658768",
        status: "In Progress",
        created_at: "2024-10-15T10:20:00Z",
        result: 85,
        notes: "Review scheduled for next week",
        dateAndTime: "15 Oct, 2024, 10:20 AM",
        transcript:[
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
            },
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
          ],
    },
  
];

export type Payment = {
    id: string
    srNo: number
    dateAndTime: string
    transcript: any
    status: "Completed" | "In progress" | "success" | "failed"
    job_title: string
    created_at: string,
    result: number,
}




function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [activeTab, setActiveTab] = React.useState("all")

    // Filter data based on active tab
    const filteredData = React.useMemo(() => {
        return data.filter((item: any) => {
            if (activeTab === "active") {
                return item.status === "In Progress"
            }
            return item.status === "Completed"
        })
    }, [activeTab])

    //columns defined here only
    const columns:any= [
        {
            accessorKey: "srNo",
            header: "Sr. No.",
            cell: ({ row }: { row: { index: number } }) => <div className="text-blue-500">{row.index + 1}</div>,
        },
        {
            header:"Call ID",
            cell: ({ row }: { row:any }) => (
                <p className="flex items-center text-blue-500 gap-2">
                
                  #123456
                  
                </p>
              
            )
        },
        {
            accessorKey: "phone_no",
            header: "Phone No.",
            cell: ({ getValue }: { getValue: () => unknown }) => (
                <div>{getValue() as string}</div>
            ),
        },
        {
            accessorKey: "dateAndTime",
            header: "Date and Time",
            cell: ({ row }: { row: { original: { dateAndTime: string } } }) => (
                <div className="">
                    {row.original.dateAndTime}
                </div>
            ),
        },
        {
            accessorKey: "transcript",
            header: "Transcript",
            cell: ({ row }:  { row: { index: number; original: RecordType } }) => {
             
                  return (
                    <div>
                      <p className="font-medium">
                        {row.original.transcript && row.original.transcript[0] 
                          ? row.original.transcript[0].content.length > 30 
                            ? row.original.transcript[0].content.slice(0, 30) + "..." 
                            : row.original.transcript[0].content 
                          : "N/A"}
                      </p>
                    </div>
                  );
                }
                
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
                        <EyeIcon color='gray'/>
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
        }
    ]

    return (
        <PageContainer>
            <div className="container mx-auto px-6 py-2">
                <div>
                    <p className="heading mb-3">Call Management</p>
                </div>

                <Tabs defaultValue="active" className="w-full mb-6" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 h-12 p-1 bg-gray-100 rounded-full shadow-inner">
                    <TabsTrigger
                            className={`flex items-center justify-center p-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === "all"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}
                            value="all"
                        >
                            <span className={`${activeTab === "all"
                                    ? " text-blue-600 "
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}> All Calls</span>
                        </TabsTrigger>
                        <TabsTrigger
                            className={`flex items-center justify-center p-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === "active"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}
                            value="active"
                        >
                            <span className={`${activeTab === "active"
                                    ? " text-blue-600 "
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}> Active Calls</span>
                        </TabsTrigger>
                        <TabsTrigger
                            className={`flex items-center justify-center p-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === "previous"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}
                            value="previous"
                        >
                            <span className={`${activeTab === "previous"
                                    ? " text-blue-600 "
                                    : "text-gray-500 hover:bg-gray-200"
                                }`}> Previous Calls</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-4">
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