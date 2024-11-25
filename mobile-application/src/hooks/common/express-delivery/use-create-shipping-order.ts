import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";
interface OrderData {
    from_name: string;
    from_phone: string;
    from_address: string;
    to_name: string;
    to_phone: string;
    to_address: string;
    weight: number;
  }
const useCreateShippingOrder = () => {
  const {
    mutateAsync: createShippingOrder,
    error,
    isError,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (orderData: OrderData) => {
      return await GHN_API({
        url: "/shipping-order/create", 
        method: "POST", 
        data: orderData, 
      });
    },
    onSuccess: (data) => {
      console.log("Đơn hàng đã được tạo thành công", data);
    },
    onError: (error:any) => {
        console.log(error?.response?.data)
      console.error("Lỗi khi tạo đơn hàng:", error);
    },
  });

  return {
    createShippingOrder,
    error,
    isError,
    isLoading,
  };
};

export default useCreateShippingOrder;
