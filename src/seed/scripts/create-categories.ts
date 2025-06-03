import { getPayload } from "payload";
import config from "@payload-config";
import { subcategories, topLevelCategories } from "../data/categories";

export const createCategories = async () => {
  try {
    const payload = await getPayload({ config });

    // Store created top-level category IDs by slug
    const categoryIdMap: Record<string, string> = {};

    // 1. Create top-level categories
    for (const category of topLevelCategories) {
      const created = await payload.create({
        collection: "categories",
        data: {
          name: category.name,
          slug: category.slug,
          color: category.color,
          category: null, // No parent
        },
      });

      categoryIdMap[category.slug] = created.id;
    }

    // 2. Create subcategories with parent reference
    for (const sub of subcategories) {
      const parentId = categoryIdMap[sub.parentSlug];
      if (!parentId) {
        console.warn(
          `⚠️ Parent category not found for slug: ${sub.parentSlug}`
        );
        continue;
      }

      await payload.create({
        collection: "categories",
        data: {
          name: sub.name,
          slug: sub.slug,
          category: parentId, // This links to parent
        },
      });
    }

    console.log("✅ Categories and subcategories created successfully.");
  } catch (error) {
    console.error("❌ Error creating categories:", error);
  }
};

// Run immediately
await createCategories();
process.exit(0);
