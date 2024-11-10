import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface OrdersDelete {
  ids: string[];
}

const useOrdersDelete = () => {
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      return await api({
      url: REQUEST_URL.DELETE_ORDERS_BY_IDS,
      method: "DELETE",
      data: { ids }, // Gửi danh sách ids trong body của request
      });
    },
  });

  return mutation;
};

export default useOrdersDelete;