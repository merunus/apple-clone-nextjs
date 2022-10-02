import { Endpoints } from "../models/api-routes";

export const fetchCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${Endpoints.Categories}`
  );
  const data = await response.json();
  const categories: Category[] = data.categories;

  return categories;
};
