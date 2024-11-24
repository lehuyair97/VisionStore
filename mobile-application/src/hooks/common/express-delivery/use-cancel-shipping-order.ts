import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useCancelShippingOrder = () => {
  const {
    mutateAsync: cancelShippingOrder,
    error,
    isError,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (orderId) => {
      return await GHN_API({
        url: "/shipping-order/cancel", 
        method: "PUT", 
        data: {
          order_id: orderId, 
        },
      });
    },
    onSuccess: (data) => {
      console.log("Đơn hàng đã được hủy thành công", data);
    },
    onError: (error) => {
      console.error("Lỗi khi hủy đơn hàng:", error);
    },
  });

  return {
    cancelShippingOrder,
    error,
    isError,
    isLoading,
  };
};

export default useCancelShippingOrder;
