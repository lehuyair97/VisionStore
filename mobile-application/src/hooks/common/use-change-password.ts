import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

const useChangePassword = (customerId: string) => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await api({
          url: REQUEST_URL.CHANGE_PASSWORD(customerId),
          method: "POST",
          data: data,
        });
        return res.data || res;
      } catch (err: any) {
        return err?.response?.data;
      }
    },
    onSuccess: (data) => {
      if (data?.isSuccess) {
        toast.success(`Đổi mật khẩu thành công!`);
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled(data, error) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["Password", customerId],
        });
      }
    },
  });

  return {
    data,
    error,
    isPending,
    changePassword: mutateAsync,
  };
};

export default useChangePassword;
