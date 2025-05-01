"use client";
import { showerror } from "@/lib/toast";
import { handleApiError } from "@/lib/utils";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useState } from "react";

export default function ReactQuery({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            handleApiError(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context) => {
            handleApiError(error);
          },
        }),
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
