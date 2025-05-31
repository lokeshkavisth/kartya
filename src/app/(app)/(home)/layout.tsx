import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      <main className="border-x border-dashed min-h-screen container mx-auto p-8">
        {children}
      </main>
      <Footer />
    </main>
  );
};

export default Layout;
