export type SubcategoryType = {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategories: {
    docs: any[];
    hasNextPage: boolean;
  };
};

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  subcategories: SubcategoryType[];
};
