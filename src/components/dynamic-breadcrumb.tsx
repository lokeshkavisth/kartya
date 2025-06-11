"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path);

  console.log(pathname);

  return (
    <Breadcrumb className={cn(pathname === "/" ? "hidden" : "hidden md:flex")}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          const title = path
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <BreadcrumbItem key={path}>
              {isLast ? (
                <BreadcrumbPage className="truncate max-w-[200px]">
                  {title}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink
                    asChild
                    className="hidden sm:inline truncate max-w-[200px]"
                  >
                    <Link href={href}>{title}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbLink className="sm:hidden">
                    <Link href={href}>...</Link>
                  </BreadcrumbLink>
                </>
              )}
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
