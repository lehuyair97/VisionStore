import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";
import { orderStatus } from "./use-get-order";

const useUpdateOrderStatus = (customerId: string) => {
  const statuses = ["pending", "canceled", "shipping", "delivered"];
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (status: orderStatus) => {
      try {
        const res = await api({
          url: REQUEST_URL.UPDATE_ORDER_STATUS(customerId),
          method: "PUT",
          data: { status },
        });
        return res.data || res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success("Cập nhật thành công");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled(data, error) {
      if (data) {
        statuses.forEach((status) => {
          queryClient.invalidateQueries({ queryKey: ["orders", status] });
        });
      }
    },
  });

  return {
    data,
    error,
    isPending,
    updateStatus: mutateAsync,
  };
};

export default useUpdateOrderStatus;
