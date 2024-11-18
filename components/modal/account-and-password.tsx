'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  contact: string;
}

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AccountModalProps {
  initialData?: UserProfile;
  onSave?: (data: UserProfile) => Promise<void>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;

}

const AccountModal: React.FC<AccountModalProps> = ({
  initialData = {
    firstName: "John",
    lastName: "Doe",
    company: "Gladiator Ltd.",
    email: "john.doe@gmail.com",
    contact: "+61 975 157 8462"
  },
  isOpen,
  setIsOpen,
  onSave,

}) => {
  const [isLoading, setIsLoading] = useState(false);
 


  const [profileData, setProfileData] = useState<UserProfile>(initialData);
 

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      setIsLoading(true);
      try {
        await onSave(profileData);
      } catch (error) {
        console.error('Error saving profile:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };




  return (
<div className="relative flex justify-center">
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="relative w-full max-w-md">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-6 ">
          <p className="text-lg font-semibold">Profile settings</p>
          
          <form onSubmit={handleProfileSubmit} className="mt-2 space-y-4">
                  {/* Profile content */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{`${profileData.firstName} ${profileData.lastName}`}</p>
                      <Button type="button" variant="outline" size="sm" className="mt-1">
                        Change
                      </Button>
                    </div>
                  </div>
                  {/* Additional form fields */}
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First name</label>
                        <Input
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            firstName: e.target.value
                          }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last name</label>
                        <Input
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            lastName: e.target.value
                          }))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Company name</label>
                      <Input
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          company: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Contact details</label>
                      <Input
                        value={profileData.contact}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          contact: e.target.value
                        }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button type="submit" className=" flex common-btn text-white ms-auto" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </form>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</div>

  );
};

export default AccountModal;