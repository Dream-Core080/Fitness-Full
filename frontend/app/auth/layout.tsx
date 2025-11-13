"use client";

import Image from "next/image";
import { CSP_LOGO_PATH, CSP_BACk_PATH } from "@/utils/constants/image-paths";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Image
        src={CSP_BACk_PATH}
        alt="Cressey Sports Performance"
        className="absolute w-screen h-screen size-full bg-scroll"
        priority={true}
        suppressHydrationWarning
      />
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="w-full h-screen overflow-scroll">
        <div className="relative flex flex-col gap-20 items-center justify-center p-6 pt-24">
          <div className="w-full relative flex items-center justify-center">
            <Image src={CSP_LOGO_PATH} alt="CSP Logo" />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
