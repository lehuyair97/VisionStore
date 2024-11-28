import { queryClient } from "./../../utils/helper";
import { toast } from "@components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useLikeComment = (productID: string) => {
  const queryClient = useQueryClient();
  const {
    data,
    isPending,
    isError,
    error,
    mutateAsync: likeComment,
  } = useMutation({
    mutationFn: async (idComment: string) => {
      return api({
        url: REQUEST_URL.LIKE_COMMENT(idComment),
        method: "POST",
      });
    },
    onSuccess: (data) => {},
    onError: (error: any) => {
      toast.error("Đã có lỗi xảy ra!");
    },
    onSettled: (data, error) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["comment", productID] });
      }
    },
  });
  return { likeComment, data, isPending, isError, error };
};
export default useLikeComment;
