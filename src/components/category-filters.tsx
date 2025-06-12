import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CategoriesGetManyOutput } from "@/types/type";
import { ChevronDown, ChevronRight, ListFilter, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const CategoryFilters = ({
  categoriesData,
}: {
  categoriesData: CategoriesGetManyOutput;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openCollapsibles, setOpenCollapsibles] = useState<
    Record<string, boolean>
  >({});

  const params = useParams();

  // Filter categories based on search term
  const filteredCategories = categoriesData.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subcategories.some((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const toggleCollapsible = (categoryId: string) => {
    setOpenCollapsibles((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleSubcategoryClick = () => {
    setIsSheetOpen(false);
    setSearchQuery("");
  };

  return (
    <section className="flex items-center gap-1.5 md:w-full overflow-x-clip">
      <div className="hidden md:flex items-center gap-1.5 overflow-x-clip">
        {categoriesData.slice(0, 6).map((category) => (
          <NavigationMenu viewport={false} key={category.id}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={
                    params.category === category.slug
                      ? "text-muted-foreground border"
                      : ""
                  }
                >
                  {category.name}
                </NavigationMenuTrigger>
                {category.subcategories.length > 0 && (
                  <NavigationMenuContent>
                    <ul className="grid w-[200px]">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              className={
                                params.subcategory === subcategory.slug
                                  ? "text-muted-foreground underline"
                                  : ""
                              }
                              href={`/categories/${category.slug}/${subcategory.slug}`}
                            >
                              {subcategory.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ))}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <Button variant="outline" className="md:hidden">
            <ListFilter />
          </Button>

          <Button variant="outline" className="hidden md:flex">
            <ListFilter />
            Browse Categories
            <Badge variant="secondary">{categoriesData.length}</Badge>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>All Categories</SheetTitle>
            <SheetDescription>
              Browse all {categoriesData.length} categories and their
              subcategories
            </SheetDescription>
          </SheetHeader>
          <div className="relative w-auto px-4">
            <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              type="search"
              placeholder="Search something..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="max-h-[calc(100vh-200px)]">
            <div className="mt-4 space-y-1">
              {filteredCategories.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No categories found matching {`"${searchQuery}"`}
                </p>
              ) : (
                filteredCategories.map((category) => (
                  <Collapsible
                    key={category.id}
                    open={openCollapsibles[category.id]}
                    onOpenChange={() => toggleCollapsible(category.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex w-full justify-between p-3 h-auto font-medium text-left hover:bg-muted/50"
                      >
                        <span className="flex items-center gap-2">
                          {category.name}
                          {category.subcategories.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {category.subcategories.length}
                            </Badge>
                          )}
                        </span>
                        {category.subcategories.length > 0 && (
                          <span className="ml-2 flex-shrink-0">
                            {openCollapsibles[category.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    {category.subcategories.length > 0 && (
                      <CollapsibleContent className="space-y-1">
                        <div className="pl-4 space-y-1 border-l-2 border-muted ml-3">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              href={`/categories/${category.slug}/${subcategory.slug}`}
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/30"
                              onClick={handleSubcategoryClick}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ))
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default CategoryFilters;
