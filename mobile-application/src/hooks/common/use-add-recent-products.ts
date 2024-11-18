import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

const useAddRecentProduct = (customerId: string) => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (productId: string) => {
      try {
        const res = await api({
          url: REQUEST_URL.RECENT_PRODUCTS(customerId),
          method: "POST",
          data: { productId },
        });
        return res.data || res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled(data, error) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["RecentProducts", customerId],
        });
      }
    },
  });

  return {
    data,
    error,
    isPending,
    addRecentProduct: mutateAsync,
  };
};

export default useAddRecentProduct;
