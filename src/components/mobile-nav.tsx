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
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { ModeSwitch } from "./mode-switch";
import { Button, buttonVariants } from "./ui/button";

const MobileNav = () => {
  return (
    <header className="md:hidden border-b border-dashed">
      <section className="flex items-center justify-between border-x container mx-auto border-dashed h-14 px-4">
        <Link href={"/"}>Kartya</Link>
        <div className="flex items-center gap-4">
          <ModeSwitch />
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
                    prefetch
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "default",
                    })}
                  >
                    Start Selling
                  </Link>
                  <Link
                    prefetch
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "outline",
                    })}
                  >
                    Log out <LogOut />
                  </Link>
                </SheetFooter>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </header>
  );
};

export default MobileNav;
