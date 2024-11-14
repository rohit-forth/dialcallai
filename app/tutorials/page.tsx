"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layout/DashboardLayout';

const TutorialsSection = () => {
  return (
    <div className="w-full max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Tutorials & guides</h1>
        <p className="text-gray-500 text-sm">
          Explore step-by-step guides and solutions to help you master the job management system,
          from onboarding to advanced features.
        </p>
      </div>

      <div className="space-y-4">
        {/* Getting Started Guide */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white">
          <div>
            <h2 className="font-medium mb-1">Getting Started Guide</h2>
            <p className="text-sm text-gray-500">
              Begin your journey with our essential guide to navigate the system.
            </p>
          </div>
          <Button variant="secondary" className="bg-primaryBtn text-white ">
            View guide
          </Button>
        </div>

        {/* Onboarding Tutorials */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white">
          <div>
            <h2 className="font-medium mb-1">Onboarding Tutorials</h2>
            <p className="text-sm text-gray-500">
              Follow these tutorials to complete setup and get started quickly.
            </p>
          </div>
          <Button variant="secondary" className="bg-primaryBtn text-white ">
            Start tutorials
          </Button>
        </div>

        {/* Advanced Features */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white">
          <div>
            <h2 className="font-medium mb-1">Advanced Features Overview</h2>
            <p className="text-sm text-gray-500">
              Learn about powerful tools to maximize your productivity.
            </p>
          </div>
          <Button variant="secondary" className="bg-primaryBtn text-white">
            Explore Features
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
    return (
      <DashboardLayout>
        <TutorialsSection />
      </DashboardLayout>
    );
  }