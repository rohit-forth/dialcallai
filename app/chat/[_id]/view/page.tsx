import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Globe,
  Clock,
  MoreVertical,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageContainer from "@/components/layout/page-container";

function ChatDetailPage() {
  const chatDetails = {
    name: "Cameron Williamson",
    email: "c.williamson@gmail.com",
    phone: "+1 234 567 8900",
    country: "United States",
    avatar: "/placeholder-avatar.jpg",
  };

  return (
    <PageContainer scrollable>
    <div className="container mx-auto py-6 space-y-6 max-w-7xl">
      {/* Top Card with User Details */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={chatDetails.avatar} />
                <AvatarFallback>CW</AvatarFallback>
              </Avatar>
              <div>
                <Badge variant="outline" className="text-blue-500 border-blue-500 mb-2">
                  Chat ID: #123456
                </Badge>
                <CardTitle className="text-2xl font-bold">
                  {chatDetails.name}
                </CardTitle>
              </div>
            </div>
            {/* <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </CardContent>
      </Card>

      {/* Chat History Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Chat History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {/* Received Message */}
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>CW</AvatarFallback>
                </Avatar>
                <div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                    <p className="text-sm text-gray-800">
                      Hello! I wanted to inquire about the product details.
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">10:30 AM</span>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex flex-row-reverse gap-3 max-w-[80%] ml-auto">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-end">
                  <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none p-4">
                    <p className="text-sm">
                      Hi! Sure, I'd be happy to help. Which specific product are you interested in?
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">10:32 AM</span>
                </div>
              </div>

              {/* More messages... */}
              {Array.from({ length: 5 }).map((_, index) => (
                <React.Fragment key={index}>
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>CW</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                        <p className="text-sm text-gray-800">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {`10:${35 + index * 2} AM`}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse gap-3 max-w-[80%] ml-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-end">
                      <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none p-4">
                        <p className="text-sm">
                          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {`10:${36 + index * 2} AM`}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          {/* <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button className="flex gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
    </PageContainer>
  );
}
export default function DashboardPage() {
    return (
        <DashboardLayout>
            <ChatDetailPage />
        </DashboardLayout>
    );
}