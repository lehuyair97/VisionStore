import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";

const useCalculateShippingFee = () => {
  const {
    mutateAsync: calculateShippingFee,
    error,
    isError,
    isPending: isLoading,
  } = useMutation({
    mutationFn: async (payload: {
      from_district: number;
      to_district: number;
      service_id: number;
      weight: number;
      length: number;
      width: number;
      height: number;
    }) => {
      return await GHN_API({
        url: "/shipping-order/fee",
        method: "POST",
        data: payload,
      });
    },
    onSuccess: (data) => {
      console.log("Phí vận chuyển đã được tính toán thành công:", data);
    },
    onError: (error: any) => {
        console.log(error?.response?.data)
      console.error("Lỗi khi tính toán phí vận chuyển:", error);
    },
  });

  return {
    calculateShippingFee,
    error,
    isError,
    isLoading,
  };
};

export default useCalculateShippingFee;
