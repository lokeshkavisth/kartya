import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CategoryType } from "@/types/type";
import Link from "next/link";

interface CategoryFiltersProps {
  categoriesData: CategoryType[];
}

const CategoryFilters = ({ categoriesData }: CategoryFiltersProps) => {
  return (
    <section className="flex items-center gap-1.5">
      {categoriesData.map((category) => (
        <NavigationMenu viewport={false} key={category.id}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px]">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <NavigationMenuLink asChild>
                        <Link href={subcategory.slug}>{subcategory.name}</Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ))}
    </section>
  );
};

export default CategoryFilters;
