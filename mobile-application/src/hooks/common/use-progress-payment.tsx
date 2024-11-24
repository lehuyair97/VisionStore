import toast from "@components/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useProgressPayment = () => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await api({
        url: REQUEST_URL.CREATE_ORDER,
        method: "POST",
        data: data,
      });
    },
    onSuccess: (data) => {
      // toast.success("Đặt đơn hàng thành công");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      console.error("Mutation error:", error);
    },
    onSettled: (data, error) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      }
    },
  });

  return {
    data,
    error,
    isPending,
    usePay: mutateAsync,
  };
};

export default useProgressPayment;
