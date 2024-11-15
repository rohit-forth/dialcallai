"use client"
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log(pathname,"dfdfdsfff")
  return (
    <div className="auth-page h-screen flex items-center justify-center ">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8  overflow-hidden">
        {/* Left Section - Hidden on mobile, visible on larger screens */}
        <div className="hidden md:flex flex-col justify-center items-start p-8 md:p-10 lg:p-12  text-white">
          <span className="mb-8">
            <Icons.Logo  />
          </span>
          <p className="text-4xl font-semibold leading-tight lg:text-6xl">{`${pathname.split("/").includes("login")? "Welcome back!" :"Sign up for free!"}`}</p>
          <p className="text-3xl mt-2 lg:text-xl">{`${pathname.split("/").includes("login")? "Log into your account" :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus "}`}</p>
        </div>
        {/* Right Section - Always visible, contains the login form */}
        <main className="flex items-center justify-center rounded-lg p-8 md:p-10 lg:p-12 bg-white w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

