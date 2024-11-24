import { useQuery } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useShippingOrderDetail = (orderId) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["OrderDetail", orderId],
    queryFn: async () => {
      return await GHN_API({
        url: `/shipping-order/detail/${orderId}`,
        method:'GET',
      });
    },

  });

  return {
    data,
    error,
    isLoading,
    isError,
  };
};

export default useShippingOrderDetail;
