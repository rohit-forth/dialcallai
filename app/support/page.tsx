"use client"
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
    <div className="w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-sm w-screen text-gray-500">
          We're here to help! Reach out with any questions, feedback, or support requests, and our team will get back to you shortly.
        </p>
      </div>
      
      <div className="w-full max-w-lg p-6 -mt-5">
      
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First name
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last name
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter the subject here"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write message here..."
            className="min-h-[120px]"
            required
          />
        </div>

        <Button type="submit" className="text-white flex ms-auto bg-primaryBtn">
          Submit
        </Button>
      </form>
    </div>
      </>
  
  );
};


export default function DashboardPage() {
    return (
      <DashboardLayout>
        <ContactForm />
      </DashboardLayout>
    );
  }