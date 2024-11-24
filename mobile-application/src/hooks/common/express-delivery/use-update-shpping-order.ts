import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useUpdateShippingOrder = () => {
  const {
    mutateAsync: updateShippingOrder,
    error,
    isError,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async ({
      orderId,
      updateData,
    }: {
      orderId: string;
      updateData: any;
    }) => {
      return await GHN_API({
        url: "/shipping-order/update",
        method: "PUT",
        data: {
          order_id: orderId,
          ...updateData,
        },
      });
    },
    onSuccess: (data) => {
      console.log("Đơn hàng đã được cập nhật thành công", data);
    },
    onError: (error) => {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
    },
  });

  return {
    updateShippingOrder,
    error,
    isError,
    isLoading,
  };
};

export default useUpdateShippingOrder;
