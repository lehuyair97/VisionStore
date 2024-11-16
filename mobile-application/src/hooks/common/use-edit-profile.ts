import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

const useEditProfile = (customerId: string) => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await api({
          url: REQUEST_URL.UPDATE_INFO(customerId),
          method: "PATCH",
          data: data,
        });
        return res.data || res;
      } catch (err) {
        console.error("API call failed:", err);
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(`Cập nhật thông tin thành công!`);
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
    editProfile: mutateAsync,
  };
};

export default useEditProfile;
