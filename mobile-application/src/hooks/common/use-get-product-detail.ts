import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface ProductDetail {
    _id: string;
    id: string;
    parent_product_id: string | null;
    sku: string;
    name: string;
    price: number;
    weight: number;
    descriptions: string;
    thumbnail: string;
    image: string;
    optionsColor: {
      color: string;
      name: string;
    }[];
    optionsMemory: {
      name: string;
    }[];
    category_id: string;
    sub_category_id: string;
    option_id: string;
    create_date: string;
    stock: number;
    warrantyPeriod: string;
    description: string;
    brand: string;
    products_child: any[]; // Có thể định nghĩa chi tiết hơn nếu cần
    __v: number;
  }
  
  const useProductDetail = (id: string) => {
    const { data, isPending, error, isLoading } = useQuery({
      queryKey: ["productDetail", id], // Thêm id vào queryKey
      queryFn: async () => {
        const response = await api({
          url: REQUEST_URL.GET_PRODUCT_BY_ID(id),
          method: "GET",
        });
        console.log("API Response:", response);
        return response as ProductDetail;
      },
      enabled: !!id, // Chỉ gọi API khi có id
    });
  
    return { data, isPending, error, isLoading };
  };
  
  export default useProductDetail;