import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useCreateShippingLabel = () => {
  const {
    mutateAsync: createShippingLabel,
    error,
    isError,
    isPending:isLoading,
  } = useMutation({
    mutationFn: async (orderId) => {
      return await GHN_API({
        url: "/shipping-order/label",
        method: "POST", 
        data: {
          order_id: orderId, 
        },
      });
    },
    onSuccess: (data) => {
      console.log("Nhãn vận chuyển đã được tạo thành công", data);
    },
    onError: (error) => {
      console.error("Lỗi khi tạo nhãn vận chuyển:", error);
    },
  });

  return {
    createShippingLabel,
    error,
    isError,
    isLoading,
  };
};

export default useCreateShippingLabel;
