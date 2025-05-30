import Link from "next/link";
import React from "react";
import { navConfig } from "@/config/nav";
import { buttonVariants } from "./ui/button";

const MainNav = () => {
  return (
    <header className="sticky top-0 border-b border-dashed">
      <section className="flex items-center gap-4 border-x border-dashed container mx-auto h-14 px-4">
        <div>
          <span>LOGO</span>
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

        <div></div>
      </section>
    </header>
  );
};

export default MainNav;
