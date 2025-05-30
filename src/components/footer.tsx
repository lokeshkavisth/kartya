import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-dashed">
      <section className="container border-x h-14 border-dashed px-4 mx-auto flex items-center justify-between text-muted-foreground">
        <div>© {new Date().getFullYear()} Kartya. All rights reserved.</div>
        <div>
          <nav className="flex flex-wrap justify-center gap-4 text-sm ">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Contact</Link>
          </nav>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
