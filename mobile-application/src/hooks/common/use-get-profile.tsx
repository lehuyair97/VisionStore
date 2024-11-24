import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetProfile = (customerId: string) => {
  const { data, isPending, error, isLoading, refetch } = useQuery({
    queryKey: ["UserProfile", customerId],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.GET_USER_BY_ID(customerId),
        method: "GET",
      })) as any;
    },
    staleTime:0,
  });
  return { data: data, isPending, error, isLoading, refetchUserInfo: refetch };
};

export default useGetProfile;
