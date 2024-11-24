import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";
import axios from "axios";

interface ServiceParams {
  from_district: number;
  to_district: number;
  shop_id: number;
}

const useGetServices = () => {
  const { data, error, isPending, isError, mutateAsync } = useMutation({
    mutationFn: async (params: ServiceParams) => {
      const response = await GHN_API({
        url: "/shipping-order/available-services",
        method: "POST",
        data: {
          "shop_id": 5467966,
          "from_district": 1447,
          "to_district": 1442
        },
      });
      return response?.data
    },
    onSuccess: (data) => {
      console.log("Dịch vụ đã được lấy thành công", data);
    },
    onError: (error: any) => {
      console.error("Có lỗi khi lấy dịch vụ:", error?.response?.data);
    },
  });

  return {
    services: data,
    error,
    isPending,
    isError,
    submit: mutateAsync,
  };
};

export default useGetServices;
