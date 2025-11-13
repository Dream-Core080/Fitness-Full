"use client";

import { useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import { Pathnames } from "@/utils/constants/pathnames";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace(Pathnames.LOGIN);
  });

  return (
    <main className="flex dark">
    </main>
  );
}
