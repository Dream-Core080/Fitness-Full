"use client";

import { useRouter } from "next-nprogress-bar";
import { useEffect } from "react";

import { Sidebar } from "./sidebar";
import { Searchbar } from "./searchbar";
import { useAuthStore } from "@/stores/auth";
import { Pathnames } from "@/utils/constants/pathnames";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLogged } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!isLogged) {
      router.replace(Pathnames.LOGIN);
    }
  }, [isLogged, router]);

  return (
    <main>
      <div className="w-full h-screen lg:h-screen bg-black flex items-start">
        <Sidebar />
        <div className="flex-1 overflow-y-auto w-full h-full custom-scrollbar">
          {/* Searchbar fixed at the top */}
          <div className="sticky top-0 z-50 bg-black shadow-md">
            <Searchbar />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
