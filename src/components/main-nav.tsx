import { navConfig } from "@/config/nav";
import Link from "next/link";
import { ModeSwitch } from "./mode-switch";
import { buttonVariants } from "./ui/button";

const MainNav = () => {
  return (
    <header className="sticky top-0 border-b border-dashed hidden md:block">
      <section className="flex items-center gap-4 border-x border-dashed container mx-auto h-14 px-4">
        <div>
          <Link href={"/"}>Kartya</Link>
        </div>

        <nav>
          {navConfig.nav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={buttonVariants({ variant: "link", size: "sm" })}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <ModeSwitch />
          <Link
            prefetch
            href="/sign-in"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Start Selling
          </Link>
        </div>
      </section>
    </header>
  );
};

export default MainNav;
