import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

const useMarkAsReadNotification = (customerId: string) => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await api({
          url: REQUEST_URL.MARK_AS_READ(id),
          method: "PUT",
        });
        return res.data || res;
      } catch (err) {
        console.error("API call failed:", err);
        throw err;
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled(data, error) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["notifications",customerId],
        });
      }
    },
  });

  return {
    data,
    error,
    isPending,
    markAsRead: mutateAsync,
  };
};

export default useMarkAsReadNotification;
