import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetRecentProducts = (customerId: string) => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: ["RecentProducts", customerId],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.RECENT_PRODUCTS(customerId),
        method: "GET",
      })) as any;
    },
  });
  return { data: data, isPending, error, isLoading };
};

export default useGetRecentProducts;
