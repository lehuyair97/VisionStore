import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";
export type configType = "developer" | "graphicDesign" | "office" | "gaming";

type requestType = {
  totalBudget: number;
  configType: configType | any;
};
const useBuildAutomatic = () => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync, isPending } = useMutation({
    mutationFn: async (data: requestType) => {
      try {
        const res = await api({
          url: REQUEST_URL.BUILD_AUTOMATIC,
          method: "POST",
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
          queryKey: ["BuildPC"],
        });
      }
    },
  });

  return {
    data,
    error,
    isPending,
    build: mutateAsync,
  };
};

export default useBuildAutomatic;
