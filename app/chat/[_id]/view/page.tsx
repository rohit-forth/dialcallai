import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  Globe,
  Clock,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashboardLayout from '@/app/dashboard/layout';
import PageContainer from '@/components/layout/page-container';


const listingData = [

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
  },{
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
  },{
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
const ChatDetailPage = () => {
  const chatDetails = {
    name: "Cameron Williamson",
    email: "c.williamson@gmail.com",
    phone: "+1 234 567 8900",
    country: "United States",
    avatar: "/placeholder-avatar.jpg",
  };

  const UserDetailsPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={chatDetails.avatar} />
          <AvatarFallback>CW</AvatarFallback>
        </Avatar>
        <div>
          <Badge variant="outline" className="text-blue-500 border-blue-500 mb-2">
            Chat ID: #123456
          </Badge>
          <h2 className="text-2xl font-bold">
            {chatDetails.name}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Mail className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{chatDetails.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Phone className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{chatDetails.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Globe className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Country</p>
            <p className="font-medium">{chatDetails.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Active</p>
            <p className="font-medium">2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageContainer scrollable>
      <div className="max-h-screen flex flex-col">
        {/* Main Container */}
        <div className="flex flex-1 overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col border border-gray rounded-lg h-[calc(100vh-7rem)]">
          {/* Chat Header */}
          <div className="border-b p-4 flex items-center justify-between shrink-0 text-white common-btn rounded-t-lg"> {/* Added shrink-0 */}
            <div className="flex items-center  gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={chatDetails.avatar} />
                <AvatarFallback>CW</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{chatDetails.name}</h2>
                <p className="text-sm ">Online</p>
              </div>
            </div>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <UserDetailsPanel />
              </SheetContent>
            </Sheet>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 overflow-y-auto"> {/* Modified ScrollArea */}
            <div className="space-y-4 p-4">
              {Array.isArray(listingData) && listingData[0].chatContent?.map((item, index) => (
                <div key={index} className={`flex ${item?.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[70%] ${item.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.sender === 'user' ? '/user-avatar.png' : '/agent-avatar.png'} />
                      <AvatarFallback>{item.sender === 'user' ? 'U' : 'A'}</AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`rounded-lg p-3 ${
                        item.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {item?.content}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* User Details Panel - Hidden on mobile */}
        <div className="hidden lg:block w-80  p-6 overflow-y-auto"> {/* Added overflow-y-auto */}
          <UserDetailsPanel />
        </div>
      </div>
    </div>
    </PageContainer>
  );
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ChatDetailPage />
    </DashboardLayout>
  );
}