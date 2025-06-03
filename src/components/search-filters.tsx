"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import CategoryFilters from "./category-filters";
import { Input } from "./ui/input";

const SearchFilters = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-4 sticky top-0 pt-5 bg-background w-full">
      <div className="flex md:flex-col items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            type="search"
            placeholder="Search something..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CategoryFilters categoriesData={data} />
      </div>
    </div>
  );
};

export default SearchFilters;
