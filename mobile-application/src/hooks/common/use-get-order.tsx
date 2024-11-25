import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
export type orderStatus =
  | "pending"
  | "shipping"
  | "delivered"
  | "canceled";
const useGetOrders = ({
  userId,
  status,
}: {
  userId: string;
  status: orderStatus;
}) => {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["orders", status],
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_ORDERS_BY_USER_ID({id: userId, status}),
        method: "GET",
      });
    },
  });
  return { data, error, isPending, refetch };
};
export default useGetOrders;
