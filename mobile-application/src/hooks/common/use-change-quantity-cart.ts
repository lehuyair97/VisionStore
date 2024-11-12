import { queryClient } from "./../../utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

type Variables = {
  customerId: string;
  productId: string;
  action: "increase" | "decrease";
  quantity: Number;
};

const useChangeQuantityCart = () => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation<
    any,
    Error,
    Variables
  >({
    mutationFn: async (req: Variables) => {
      try {
        const res = await api({
          url: REQUEST_URL.CHANGE_QUANTITY_CART,
          method: "POST",
          data: req,
        });
        return res.data || res;
      } catch (err) {
        console.error("API call failed:", err);
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success("Quantity updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled(data, error) {
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
    submitChangeQuantity: mutateAsync,
  };
};

export default useChangeQuantityCart;
