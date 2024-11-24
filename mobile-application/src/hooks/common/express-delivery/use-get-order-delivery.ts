import { useMutation } from "@tanstack/react-query";
import GHN_API from "@utils/express-delivery-api";
import axios from "axios";

const useGetDeliveryOrderCancle = () => {
  const now = new Date(); // Thời gian hiện tại
  const fromTime = Math.floor(
    new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).getTime() / 1000
  ); // Trừ 30 ngày
  const toTime = Math.floor(
    new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).getTime() / 1000
  ); // Ngày mai

  const params = {
    shop_id: 5467966,
    status: ["cancel"],
    payment_type_id: [1, 2, 4, 5],
    from_time: fromTime,
    to_time: toTime,
    offset: 0,
    limit: 100,
    from_cod_amount: 0,
    to_cod_amount: 0,
    ignore_shop_id: false,
    shop_ids: null,
    is_search_exactly: false,
    is_print: null,
    is_cod_failed_collected: null,
    is_document_pod: null,
    service_type_ids: [],
    source: "5sao",
  };

  const { data, mutateAsync } = useMutation({
    mutationFn: async () => {
      return await GHN_API({
        url: "/shipping-order/search",
        method: "POST",
        data: params,
      });
    },
    onSuccess: (data)=>{
        
    },
    onError: (error) =>{

    }
  });
  return { data, getOrderCancle: mutateAsync };
};
export default useGetDeliveryOrderCancle
