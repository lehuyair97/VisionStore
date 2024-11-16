import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetNotificationsByUserId = (customerId: string) => {
  const { data, isPending, error, isLoading } = useQuery({
    queryKey: ["notification", customerId],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.GET_NOTIFICATIONS_BY_USER_ID(customerId),
        method: "GET",
      })) as any;
    },
  });
  return { data: data, isPending, error, isLoading };
};

export default useGetNotificationsByUserId;
