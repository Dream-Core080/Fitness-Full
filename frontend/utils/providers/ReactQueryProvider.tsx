"use client";

import { reactQueryConfig } from "@/libs/react-query";
import { QueryClientProvider } from "react-query";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={reactQueryConfig}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
