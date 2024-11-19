// components/providers/Provider.tsx
"use client";
import { createContext, useContext, ReactNode, useState } from "react";
import { useRouter } from "next/navigation"; // Updated to next/navigation
import { destroyCookie } from "nookies";
import henceforthApi from "@/utils/henceforthApi";

interface UserInfo {
  access_token?: string;
  [key: string]: any;
}

interface GlobalContextType {
  logout: () => Promise<void>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  userInfo: UserInfo | null;
  stopSpaceEnter: (event: React.KeyboardEvent) => boolean;
  getProfile: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
  userInfo?: UserInfo;
}

export function GlobalProvider({ children, userInfo: initialUserInfo }: GlobalProviderProps) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(initialUserInfo || null);
  console.log(initialUserInfo, "initialUserInfo");

  if (userInfo?.access_token) {
    henceforthApi.setToken(userInfo.access_token);
  }

  const stopSpaceEnter = (event: React.KeyboardEvent): boolean => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value.length === 0 && event.key === " ") {
        event.preventDefault();
        return false;
      }
      
      // Allow only letters and space
      if (!/^[a-zA-Z ]$/.test(event.key) && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        return false;
      }
    }
    return true;
  };

  const logout = async () => {
    setUserInfo(null);
    destroyCookie(null, "COOKIES_ADMIN_ACCESS_TOKEN", {
      path: "/",
    });
    router.replace("/auth/login");
  };

  const getProfile = async () => {
    try {
      const apiRes = await henceforthApi.SuperAdmin.profile();
      setUserInfo(apiRes?.data);
    } catch (error) {
      console.error('Profile fetch error:', error);
      
     
    }
  };

  const contextValue: GlobalContextType = {
    logout,
    setUserInfo,
    userInfo,
    stopSpaceEnter,
    getProfile,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook to use the global context
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}

export default GlobalProvider;