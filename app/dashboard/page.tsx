"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Loader2,
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
  MessagesSquare,
  UserCheck,
  Volume2,
  Phone,
  EyeIcon,
  PhoneIncoming,
  MessageSquare,
  Clock,
} from 'lucide-react';
import PageContainer from '@/components/layout/page-container';
import { Icons } from '@/components/icons';
import {
  ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/common/data-table';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        <div className={`rounded-lg p-3 ${message.sender === 'user'
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
        {message?.sender == "agent" ? "John Doe" : "Sarah Smith"}
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
                    {selectedRecord?.transcript?.map((message: any) => (
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
                    {selectedRecord.chatContent?.map((message: any) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {

  //table columns

  // const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);
  const router = useRouter()
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSheetOpen, setIsSheetOpen] = useState(false);

  const listingData: RecordType[] = [
    {
      id: 1,
      type: 'call',
      srNo: '001',
      phoneNo: '+1234567890',
      dateTime: '2024-02-14 10:30 AM',
      status: 'completed',
      transcript: [
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
      duration: '15:23',
      callType: 'incoming',
      department: 'Sales',
      agentName: 'Sarah Johnson',
      callStatus: 'completed'
    },
    {
      id: 2,
      type: 'chat',
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
    }, {
      id: 2,
      type: 'chat',
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
    }, {
      id: 2,
      type: 'chat',
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
  const columns: ColumnDef<RecordType>[] = [
    {
      accessorKey: 'srNo',
      header: 'Sr. No.',
      cell: ({ row }) => <div className="text-blue-500">{row.index + 1}</div>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        row.original?.type === "call" ? <PhoneCall className="h-5 w-5 text-blue-500" /> : <MessagesSquare className="h-5 w-5 text-blue-500" />
      ),
    },
    {
      accessorKey: 'phoneNo',
      header: 'Phone/Name',
      cell: ({ row }) => (row.original.type === 'call' ? row.original.phoneNo : row.original.name),
    },

    {
      accessorKey: 'dateTime',
      header: 'Date and Time',
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        if (row.original.type === 'call') {
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
        return (
          <div>
            <p className="font-medium">{row.original.transcript && row.original.transcript[0]
              ? row.original.transcript[0].content.length > 30
                ? row.original.transcript[0].content.slice(0, 30) + "..."
                : row.original.transcript[0].content
              : "N/A"}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => {
        const [isSheetOpen, setIsSheetOpen] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [selectedRecord, setSelectedRecord] = useState(null);

        const handleViewRecord = async (record: any) => {
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
                <EyeIcon color='gray' />
              </Button>
            </SheetTrigger>

            <SheetContent
              className="w-[100%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 
              max-w-[100%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[70%] xl:max-w-[50%]
              max-h-screen overflow-y-auto"
              side="right"
            >
              <SheetContentComponent
                isLoading={isLoading}
                selectedRecord={selectedRecord}
              />
            </SheetContent>
          </Sheet>
        );
      },
    },
  ];

  const cardData = {
    activeCalls: {
      count: 5,
      avgDuration: '4:25',
      inQueue: 3,
      trend: '+12%',
      agentsAvailable: 8,
      longestWait: '2:30'
    },
    totalCalls: {
      count: 150,
      incoming: 95,
      outgoing: 45,
      missed: 10,
      avgHandleTime: '5:30',
      satisfaction: '94%'
    },
    totalChats: {
      count: 75,
      active: 12,
      avgResponse: '45s',
      resolved: 58,
      satisfaction: '96%',
      waitingCustomers: 5
    }
  };

  // const handleViewRecord = async (record: RecordType) => {
  //   setIsLoading(true);
  //   setIsSheetOpen(true);
  //   setSelectedRecord(record);

  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   setIsLoading(false);
  // };

  const [timePeriod, setTimePeriod] = useState('year');

  return (
    <PageContainer scrollable>
      <div className="container mx-auto p-6">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Active Calls Card */}
          <Card onClick={() => router.push("/call-management/page/1")} className="h-full group relative overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-blue-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <CardTitle className="text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
                Active Calls
              </CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground group-hover:text-blue-700 transition-colors duration-300" />
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-bold group-hover:text-blue-700 transition-colors duration-300">
                    {cardData.activeCalls.count}
                  </div>
                  {/* <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{cardData.activeCalls.trend} from last hour</span>
                  </div> */}
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Agents Available</p>
                    <p className="font-medium">{cardData.activeCalls.agentsAvailable}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Duration</p>
                    <p className="font-medium">{cardData.activeCalls.avgDuration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Longest Wait</p>
                    <p className="font-medium">{cardData.activeCalls.longestWait}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">In Queue</p>
                    <p className="font-medium">{cardData.activeCalls.inQueue}</p>
                  </div>
                </div>
              </div> */}
            </CardContent>
          </Card>

          {/* Total Calls Card */}
          {/* <Card onClick={()=>router.push("/call-management/page/1")} className="group relative overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-green-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <CardTitle className="text-sm font-medium group-hover:text-green-700 transition-colors duration-300">
                Total Calls Today
              </CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground group-hover:text-green-700 transition-colors duration-300" />
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-bold group-hover:text-green-700 transition-colors duration-300">
                    {cardData.totalCalls.count}
                  </div> */}
          {/* <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Timer className="h-4 w-4" />
                    <span>Avg Handle Time: {cardData.totalCalls.avgHandleTime}</span>
                  </div> */}
          {/* </div>
              </div> */}
          {/* 
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <PhoneIncoming className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Incoming</p>
                    <p className="font-medium">{cardData.totalCalls.incoming}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneOutgoing className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Outgoing</p>
                    <p className="font-medium">{cardData.totalCalls.outgoing}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneMissed className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Missed</p>
                    <p className="font-medium">{cardData.totalCalls.missed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                    <p className="font-medium">{cardData.totalCalls.satisfaction}</p>
                  </div>
                </div>
              </div> */}
          {/* </CardContent>
          </Card> */}


          {/* Total Calls Card */}
          <Card onClick={() => router.push("/call-management/page/1")} className="group relative overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-green-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

            <CardHeader className="flex flex-row items-center justify-between pb-2 -mt-4 relative z-10">
              <CardTitle className="text-sm font-medium group-hover:text-green-700 transition-colors duration-300">
                Total Calls
              </CardTitle>
              <div className="flex flex-col items-end">
                <Select
                  defaultValue="year"
                  onValueChange={setTimePeriod}
                >
                  <SelectTrigger
                    className="w-[130px] h-9 text-xs"
                    onClick={e => e.stopPropagation()}
                  >
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Phone className="h-4 w-4 text-muted-foreground group-hover:text-green-700 transition-colors duration-300 mt-2" />
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-bold group-hover:text-green-700 transition-colors duration-300 -mt-6">
                    {cardData.totalCalls.count}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Chats Card */}
          <Card onClick={() => router.push("/chat/page/1")} className="group relative overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-purple-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

            <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
              <CardTitle className="text-sm font-medium group-hover:text-purple-700 transition-colors duration-300">
                Total Chats
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-purple-700 transition-colors duration-300" />
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-bold group-hover:text-purple-700 transition-colors duration-300">
                    {cardData.totalChats.count}
                  </div>
                  {/* <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <MessagesSquare className="h-4 w-4" />
                    <span>Active: {cardData.totalChats.active}</span>
                  </div> */}
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Response</p>
                    <p className="font-medium">{cardData.totalChats.avgResponse}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Resolved</p>
                    <p className="font-medium">{cardData.totalChats.resolved}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                    <p className="font-medium">{cardData.totalChats.satisfaction}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Waiting</p>
                    <p className="font-medium">{cardData.totalChats.waitingCustomers}</p>
                  </div>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>


        {/*Data Table */}


        <DataTable
          columns={columns}
          data={listingData}
          totalItems={40}
        />



      </div>
    </PageContainer>
  );
};

export default Dashboard;