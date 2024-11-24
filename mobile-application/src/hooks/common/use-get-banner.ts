import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface BannerType {
  _id: string;
  name: string;
  description: string;
  image: string;
  productID: string;
}

const useGetBanner = () => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = (await api({
        url: REQUEST_URL.GET_BANNER,
        method: "GET",
      })) as BannerType[];
      return response;
    },
  });
  return { data, isPending, error, isLoading };
};

export default useGetBanner;
