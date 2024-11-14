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
  onPasswordChange?: (data: PasswordForm) => Promise<void>;
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
  onPasswordChange
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const [activeTab, setActiveTab] = useState<string>("account");
  const [profileData, setProfileData] = useState<UserProfile>(initialData);
  const [passwordData, setPasswordData] = useState<PasswordForm>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

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

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onPasswordChange && passwordData.newPassword === passwordData.confirmPassword) {
      setIsLoading(true);
      try {
        await onPasswordChange(passwordData);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } catch (error) {
        console.error('Error changing password:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
<div className="relative flex justify-center">
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="relative w-full max-w-md">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-6 pt-16">
          {/* Tabs component with TabsList inside */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* TabsList placed at the top, within Tabs */}
            <div className="absolute w-[200px] rounded-lg -top-10 left-0 right-0 h-10">
              <TabsList className="grid w-full grid-cols-2 rounded-lg bg-white">
                <TabsTrigger
                  value="account"
                  className="rounded-t-lg data-[state=active]:bg-white data-[state=active]:border-b-0"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="rounded-t-lg data-[state=active]:bg-white data-[state=active]:border-b-0"
                >
                  Password
                </TabsTrigger>
              </TabsList>
            </div>

            <div className='-mt-10' >
              <TabsContent value="account">
                <DialogHeader>
                  <DialogTitle>My account</DialogTitle>
                  <p className='text-xs text-gray '>Make changes to your account here. Click save when you're done.</p>
                </DialogHeader>
                <form onSubmit={handleProfileSubmit} className="mt-4 space-y-4">
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
                  <Button type="submit" className=" flex bg-ptimaryBtn text-white ms-auto" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="password">
                <DialogHeader>
                  <DialogTitle>Change password</DialogTitle>
                  <p className='text-xs text-gray '>Make changes to your account here. Click save when you're done.</p>
                </DialogHeader>
                <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
                  {/* Password fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Enter old password</label>
                      <div className="relative">
                        <Input
                          type={showPasswords.old ? "text" : "password"}
                          value={passwordData.oldPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            oldPassword: e.target.value
                          }))}
                          className="mt-1 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-1/2 -translate-y-1/2"
                          onClick={() => togglePasswordVisibility('old')}
                        >
                          {showPasswords.old ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className='text-xs mt-1 text-end text-primary' >Forgot Password ?</p>
                    </div>
                    

                    <div>
                      <label className="text-sm font-medium">Enter new password</label>
                      <div className="relative">
                        <Input
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            newPassword: e.target.value
                          }))}
                          className="mt-1 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-1/2 -translate-y-1/2"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showPasswords.new ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Re-enter new password</label>
                      <div className="relative">
                        <Input
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            confirmPassword: e.target.value
                          }))}
                          className="mt-1 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-1/2 -translate-y-1/2"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showPasswords.confirm ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className=" flex bg-primaryBtn text-white ms-auto"
                    disabled={isLoading || passwordData.newPassword !== passwordData.confirmPassword}
                  >
                    {isLoading ? "Saving..." : "Save password"}
                  </Button>
                </form>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</div>

  );
};

export default AccountModal;