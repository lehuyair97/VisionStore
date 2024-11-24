import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

type AddressType = {
  newAddress: {
    detail: string;
    location: string;
  };
  isSelected: boolean;
  addressId?: string;
};
const useUpdateAddress = (customerId: string) => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (address: AddressType | any) => {
      try {
        const res = await api({
          url: REQUEST_URL.UPDATE_ADDRESS(customerId),
          method: "PUT",
          data: address,
        });
        return res.data || res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success('Cập nhật thành công')
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
    updateAddress: mutateAsync,
  };
};

export default useUpdateAddress;
