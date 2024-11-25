import { useQuery } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useShippingServices = (shopId) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["ShippingServices", shopId],
    queryFn: async () => {
      return await GHN_API({
        url: `/shipping-service?shop_id=${shopId}`, 
        method: "GET",
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

export default useShippingServices;
