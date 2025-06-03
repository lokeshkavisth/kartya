import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import configPromise from "@payload-config";
import { CollectionSlug, getPayload } from "payload";
import SearchFilters from "@/components/search-filters";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories" as CollectionSlug,
    pagination: false,
    depth: 1,
    sort: "name",
    where: {
      category: {
        exists: false,
      },
    },
  });

  // console.log(data);

  const formattedData = data.docs.map((category) => ({
    ...category,
    subcategories: (category.subcategories?.docs || []).map((subcategory) => ({
      ...subcategory,
    })),
  }));
  // console.log(formattedData);

  return (
    <main>
      <Header />
      <main className="border-x border-dashed min-h-screen container mx-auto p-8">
        <SearchFilters data={formattedData} />
        {children}
      </main>
      <Footer />
    </main>
  );
};

export default Layout;
