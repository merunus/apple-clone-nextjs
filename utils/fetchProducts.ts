import { Endpoints } from "../models/api-routes";

export const fetchProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${Endpoints.Products}`
  );
  const data = await response.json();
  const products: Product[] = data.products;

  return products;
};
