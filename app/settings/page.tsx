import React from 'react';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageContainer from '@/components/layout/page-container';

const SettingsPage = () => {
 return (
    <PageContainer scrollable>
   <div className="container mx-auto px-6 py-2 ">
             
                 <p className="heading mb-4">Settings</p>
            
     <div className='mx-auto py-4'>
       <div className="grid grid-cols-2 gap-6">
         {/* User Management */}
         <section>
           <h2 className="text-lg font-medium mb-4">User Management</h2>
           <div className="space-y-4">
             <div>
               <Label htmlFor="user-list">User List</Label>
               <Button variant="outline" className="w-full">
                 View User List
               </Button>
             </div>
             <div>
               <Label htmlFor="add-user">Add User</Label>
               <Input id="add-user" placeholder="Enter new user details" />
             </div>
           </div>
         </section>

         {/* Call & Chat Settings */}
         <section>
           <h2 className="text-lg font-medium mb-4">Call & Chat Settings</h2>
           <div className="space-y-4">
             <div>
               <Label htmlFor="auto-call-distribution">Automatic Call Distribution</Label>
               <Switch id="auto-call-distribution" />
             </div>
             <div>
               <Label htmlFor="call-escalation">Call Escalation</Label>
               <Textarea id="call-escalation" placeholder="Configure call escalation rules" />
             </div>
             <div>
               <Label htmlFor="automated-responses">Automated Responses</Label>
               <Button variant="outline" className="w-full">
                 Manage Automated Responses
               </Button>
             </div>
             <div>
               <Label htmlFor="chat-routing">Chat Routing</Label>
               <Textarea id="chat-routing" placeholder="Configure chat routing rules" />
             </div>
           </div>
         </section>
       </div>

       {/* Integrations */}
       <section className="mt-8">
         <h2 className="text-lg font-medium mb-4">Integrations</h2>
         <div className="space-y-4">
           <div>
             <Label htmlFor="crm-integration">CRM Integration</Label>
             <Switch id="crm-integration" />
           </div>
           <div>
             <Label htmlFor="messaging-platforms">Messaging Platforms</Label>
             <Button variant="outline" className="w-full">
               Manage Messaging Integrations
             </Button>
           </div>
         </div>
       </section>

       {/* Preferences */}
       <section className="mt-8">
         <h2 className="text-lg font-medium mb-4">Preferences</h2>
         <div className="space-y-4">
           <div>
             <Label htmlFor="alert-thresholds">Alert Thresholds</Label>
             <Textarea id="alert-thresholds" placeholder="Configure alert thresholds" />
           </div>
           <div>
             <Label htmlFor="notification-channels">Notification Channels</Label>
             <div className="space-y-2">
               <div className="flex items-center gap-2">
                 <Switch id="email-notifications" />
                 <Label htmlFor="email-notifications">Email</Label>
               </div>
               <div className="flex items-center gap-2">
                 <Switch id="mobile-notifications" />
                 <Label htmlFor="mobile-notifications">Mobile Push</Label>
               </div>
             </div>
           </div>
           <div>
             <Label htmlFor="branding">Branding & Styling</Label>
             <div className="space-y-2">
               <div>
                 <Label htmlFor="logo-upload">Logo</Label>
                 <Input type="file" id="logo-upload" />
               </div>
               <div>
                 <Label htmlFor="color-palette">Color Palette</Label>
                 <Input type="color" id="color-palette" />
               </div>
               <div>
                 <Label htmlFor="chat-widget">Chat Widget Customization</Label>
                 <Button variant="outline" className="w-full">
                   Customize Chat Widget
                 </Button>
               </div>
             </div>
           </div>
         </div>
       </section>

       <div className="mt-8 flex justify-end">
         <Button variant="default">Save Changes</Button>
       </div>
     </div>
   </div>
   </PageContainer>
 );
};

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <SettingsPage />
        </DashboardLayout>
    )
}