import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export type getProductByBrandType = {
  categoryID: string;
  brandID: string;
};

export interface ProductResponse {
  flatMap(arg0: (brand: any) => any): unknown;
  map(arg0: (brand: any) => any): unknown;
  _id: string;
  products: Product[];
  brand: string;
}

export interface Product {
  _id: string;
  id: string;
  parent_product_id: any;
  sku: string;
  name: string;
  price: number;
  weight: number;
  descriptions: string;
  thumbnail: string;
  image: string;
  category_id: string;
  sub_category_id: string;
  option_id: string;
  create_date: string;
  stock: number;
  warrantyPeriod: string;
  description: string;
  brand: string;
  products_child: any[];
  __v: number;
}

const useGetProductByBrandID = (variables: getProductByBrandType) => {
  return useQuery({
    queryKey: ["useGetProductByBrandID", variables],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.GET_PRODUCT_BY_BRAND_ID(variables),
        method: "GET",
      })) as ProductResponse[];
    },
  });
};

export default useGetProductByBrandID;
