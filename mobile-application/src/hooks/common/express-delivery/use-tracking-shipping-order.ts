import { useQuery } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useTrackShippingOrder = (trackingCode) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["TrackShippingOrder", trackingCode],
    queryFn: async () => {
      return await GHN_API({
        url: `/shipping-order/track?tracking_code=${trackingCode}`, 
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

export default useTrackShippingOrder;
