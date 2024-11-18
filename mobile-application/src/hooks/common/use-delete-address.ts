import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

type AddressType = {
  addressId?: string;
};
const useRemoveAddress = (customerId: string) => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (address: AddressType) => {
      try {
        const res = await api({
          url: REQUEST_URL.DELETE_ADDRESS(customerId),
          method: "PUT",
          data: address,
        });
        return res.data || res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success("Xóa địa chỉ thành công!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled(data, error) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["UserProfile", customerId],
        });
      }
    },
  });

  return {
    data,
    error,
    isPending,
    removeAddress: mutateAsync,
  };
};

export default useRemoveAddress;
