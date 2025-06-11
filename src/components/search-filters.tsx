"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import CategoryFilters from "./category-filters";
import DynamicBreadcrumb from "./dynamic-breadcrumb";
import { Input } from "./ui/input";

export const SearchFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const trpc = useTRPC();
  const { data, isLoading } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  return (
    <div className="space-y-4 sticky top-0 pt-5 bg-background w-full border-b px-6 border-dashed pb-4">
      <div className="flex md:flex-col items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            disabled={isLoading}
            type="search"
            placeholder="Search something..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CategoryFilters categoriesData={data} />
      </div>
      <DynamicBreadcrumb />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div className="space-y-2 flex md:block items-center gap-2">
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-10 rounded-md md:hidden" />
      <div className="items-center gap-1.5 hidden md:flex">
        {[1, 2, 3, 4].map((idx) => (
          <Skeleton key={idx} className="h-8 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};
