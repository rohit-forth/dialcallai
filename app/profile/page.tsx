"use client";
import React, { useState } from 'react';
import Profile_image from '@images/profileimg.png';
import Profile_Banner from '@images/profile_banner.png';
import gladiatorLogo from '@images/gladiator.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Users, Bell, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Icons } from "@/components/icons"
import DashboardLayout from '../dashboard/layout';
import { Separator } from '@/components/ui/separator';
import AccountModal from '@/components/modal/account-and-password';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
const ProfileView = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = async (data: any) => {
    console.log('Saving profile:', data);
    // Close the modal after saving
    handleCloseModal();
  };

  const handlePasswordChange = async (data: any) => {
    console.log('Changing password:', data);
    // Close the modal after password change
    handleCloseModal();
  };

  return (
    <div className='p-7 min-h-screen bg-gray-50'>
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      <div className='relative '>
        {/* Background Image */}
        <div className='w-full flex justify-center overflow-hidden'>
          <img
            src={Profile_Banner.src}
            alt='profile-bg'
            className=' h-full rounded-xl w-full object-cover'
          />
        </div>

        {/* White Card Container */}
        <Card className='max-w-4xl mx-auto rounded-2xl -mt-48 relative z-10 w-[732px]'>
          <CardContent className='p-6'>
            {/* Profile Section */}
            <div className='flex flex-row-reverse justify-between items-start pb-8'>
              <div className='flex flex-col items-center w-full'>
                <Avatar className='h-[140px] w-[140px] -mt-28 border-white'>
                  <AvatarImage src={Profile_image.src} className='w-full h-full' alt='John Doe' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className='mt-4 w-[135px] h-[70.11px]'>
                  <h2 className='text-center text-2xl font-semibold'>John Doe</h2>
                  <p className='text-center text-gray-500'>+61 5221 5521 55</p>
                  <p className='text-center text-gray-500'>john.doe@gmail.com</p>
                </div>
              </div>
              <Button onClick={handleOpenModal} className='absolute rounded-lg' variant="outline" size="icon">
                <Icons.Pencil />
              </Button>
            </div>

            {/* Settings Section */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <div className='bg-gray-100 p-2 rounded'>
                  <img src={gladiatorLogo.src} alt="Gladiator Ltd." className='h-6 w-6' />
                </div>
                <span className='font-medium text-xl'>Gladiator Ltd.</span>
              </div>
              <ul className='flex gap-4 flex-col p-3'>
                <li className='flex items-center justify-between'>
                  <span className='flex items-center gap-2'>
                    <Icons.Bell2 />Notification settings
                  </span>
                  <span><Icons.RightArrow /></span>
                </li>



                <AlertDialog>
                  <AlertDialogTrigger asChild onClick={() => setIsDeleteDialogOpen(true)}>
                    <li className='flex items-center justify-between text-danger cursor-pointer'>
                      <span className='flex items-center gap-2'>
                        <Icons.Delete />Delete account
                      </span>
                    </li>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Account</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className={"bg-red-400 text-white"}> Delete Account</AlertDialogAction>
            </AlertDialogFooter>
                    {/* <div className="flex flex-col gap-3 py-4">
                      <Button
                        className="w-full bg-red-400 text-white"
                        variant="default"
                        onClick={() => {

                          setIsDeleteDialogOpen(false); // Close the dialog
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div> */}
                  </AlertDialogContent>
                </AlertDialog>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      {isModalOpen && (
        <AccountModal
          initialData={{
            firstName: "John",
            lastName: "Doe",
            company: "Gladiator Ltd.",
            email: "john.doe@gmail.com",
            contact: "+61 975 157 8462"
          }}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSave={handleSaveProfile}
          onPasswordChange={handlePasswordChange}
        //onClose={handleCloseModal} // Assuming your AccountModal accepts an onClose prop
        />
      )}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ProfileView />
    </DashboardLayout>
  );
}