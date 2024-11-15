import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  User,
  Phone,
  CheckCircle2,
  FileText,
  Download,
  Share2,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageContainer from "@/components/layout/page-container";

function DetailPage() {
  return (
    <PageContainer scrollable>
    <div className="container mx-auto py-6 space-y-8 max-w-7xl">
      {/* Top Card with Call Details */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-blue-500 border-blue-500">
                  Call ID: #123456
                </Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Completed
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold">
                Sales Call with John Doe
              </CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">May 20, 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">45 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Participant</p>
                <p className="font-medium">John Doe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Phone className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">+1 234 567 8900</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Summary</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 leading-relaxed">
              This call discussed the new product launch strategy. Key points
              included marketing timeline, budget allocation, and target audience
              segmentation. The client showed particular interest in social media
              campaigns and requested detailed analytics for previous campaigns.
              Action items were assigned with respective deadlines, and a follow-up
              meeting was scheduled for next week.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Transcript Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Transcript</h2>
        </div>
        <Card>
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Speaker 1 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">John Doe</Badge>
                    <span className="text-sm text-muted-foreground">00:00</span>
                  </div>
                  <p className="text-gray-600 pl-4">
                    Hello, thank you for joining the call today. We'll be
                    discussing the new product launch strategy.
                  </p>
                </div>

                {/* Speaker 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Sarah Smith</Badge>
                    <span className="text-sm text-muted-foreground">00:15</span>
                  </div>
                  <p className="text-gray-600 pl-4">
                    Hi John, thanks for having me. I've reviewed the preliminary
                    materials you sent over.
                  </p>
                </div>

                {/* More transcript entries... */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">
                        {index % 2 === 0 ? "John Doe" : "Sarah Smith"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {`00:${(index + 2) * 15}`}
                      </span>
                    </div>
                    <p className="text-gray-600 pl-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </section>
    </div>
    </PageContainer>
  );
}

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <DetailPage />
        </DashboardLayout>
    );
}