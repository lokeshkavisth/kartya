import React from "react";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

const Header = () => {
  return (
    <section>
      <MainNav />
      <MobileNav />
    </section>
  );
};

export default Header;
