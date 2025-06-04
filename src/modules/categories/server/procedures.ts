import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      pagination: false,
      depth: 1,
      sort: "name",
      where: {
        category: {
          exists: false,
        },
      },
    });

    const formattedData = data.docs.map((category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map(
        (subcategory) => ({
          ...(subcategory as Category),
        })
      ),
    }));

    return formattedData;
  }),
});
