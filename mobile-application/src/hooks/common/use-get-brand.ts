import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface Brand {
    _id: string;
    name: string;
    description: string;
    logo: string;
    brandType: string;
}

const useGetBrand = () => {
  const {data, isPending,error, isLoading} = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const response = (await api({
        url: REQUEST_URL.GET_BRANDS,
        method: "GET",
      })) as Brand[];
      return response;
    },
  });
  return { data, isPending, error, isLoading };
};

export default useGetBrand;
