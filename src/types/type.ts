import type { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesGetManyOutputSingle = CategoriesGetManyOutput[0];

export type ProductsGetManyOutput =
  inferRouterOutputs<AppRouter>["products"]["getMany"];

export type ProductsGetManyOutputSingle = CategoriesGetManyOutput[0];
