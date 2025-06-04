import Footer from "@/components/footer";
import Header from "@/components/header";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "@/components/search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <main>
      <Header />
      <main className="border-x border-dashed min-h-screen container mx-auto p-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<SearchFiltersSkeleton />}>
            <SearchFilters />
          </Suspense>
        </HydrationBoundary>
        {children}
      </main>
      <Footer />
    </main>
  );
};

export default Layout;
