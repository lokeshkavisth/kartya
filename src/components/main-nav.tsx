import { navConfig } from "@/config/nav";
import { caller } from "@/trpc/server";
import Link from "next/link";
import { ModeSwitch } from "./mode-switch";
import { buttonVariants } from "./ui/button";

const MainNav = async () => {
  const { user } = await caller.auth.session();

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
          {user && user.id && (
            <Link
              href={"/library"}
              className={buttonVariants({ variant: "link", size: "sm" })}
            >
              Library
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <ModeSwitch />
          {user && user.id ? (
            <Link
              href="/admin"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              prefetch
              href="/sign-in"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              Start Selling
            </Link>
          )}
        </div>
      </section>
    </header>
  );
};

export default MainNav;
