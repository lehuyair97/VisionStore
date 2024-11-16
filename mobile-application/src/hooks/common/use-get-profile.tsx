import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetProfile = (customerId: string) => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: ["UserProfile", customerId],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.GET_USER_BY_ID(customerId),
        method: "GET",
      })) as any;
    },
    
  });
  return { data: data, isPending, error, isLoading };
};

export default useGetProfile;
