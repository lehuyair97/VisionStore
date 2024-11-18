import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

type addCommentRequest = {
  productID: string;
  variables: {
    text: string;
    image?: any;
  };
};
const useAddComment = () => {
  const {
    data,
    error,
    isPending,
    mutateAsync: submit,
  } = useMutation({
    mutationFn: async (data: addCommentRequest) => {
      return api({
        url: REQUEST_URL.ADD_COMMENT(data.productID),
        method: "POST",
        data: data.variables,
      });
    },
    onError: (e: any) => {
    },
    onSuccess: (data: any) => {},
  });
  return { submit, data, error, isPending };
};
