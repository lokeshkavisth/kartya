import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navConfig } from "@/config/nav";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

const MobileNav = () => {
  return (
    <header className="md:hidden border-b border-dashed">
      <section className="flex items-center justify-between border-x container mx-auto border-dashed h-14 px-4">
        <div>
          <Link href={"/"}>Kartya</Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[540px]">
            <SheetDescription>
              <nav className="flex flex-col pt-4">
                {navConfig.nav.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={buttonVariants({
                      variant: "link",
                      size: "sm",
                    })}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
              <SheetFooter>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "default", size: "sm" })}
                >
                  Login
                </Link>
              </SheetFooter>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </section>
    </header>
  );
};

export default MobileNav;
