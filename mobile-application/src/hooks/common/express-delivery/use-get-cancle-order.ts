import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useGetCancleOrders = () => {
  const {
    mutateAsync: getCancleOrders,
    data,
    error,
    isError,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (data: any) => {
      return await GHN_API({
        url: "/shipping-order/search", 
        method: "POST", 
        data: data,
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
    getCancleOrders,
    data,
    error,
    isError,
    isLoading,
  };
};

export default useGetCancleOrders;
