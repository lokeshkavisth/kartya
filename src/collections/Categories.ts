import type { CollectionConfig, CollectionSlug } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories" as CollectionSlug,

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "color",
      type: "text",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories" as CollectionSlug,
      hasMany: false,
    },
    {
      name: "subcategories",
      type: "join",
      collection: "categories" as CollectionSlug,
      on: "category",
      hasMany: true,
    },
  ],
};
