import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import { Helper } from "@utils/helper";

type AddCommentRequest = {
  productID: string;
  text: string;
  image?: File[] | any;
  userID: string;
  rating: number;
};

const useAddComment = () => {
  const {
    data,
    error,
    isPending,
    mutateAsync: addComment,
  } = useMutation({
    mutationFn: async (data: AddCommentRequest) => {
      const formData = new FormData();
      formData.append("productID", data.productID);
      formData.append("text", data.text);
      formData.append("userID", data.userID);
      formData.append("rating", data.rating.toString());
      if (data.image) {
        data.image.forEach((file, index) => {
          if (file.uri && file.mimeType) {
            const fileName = file.uri.split("/").pop();
            formData.append("images", {
              uri: file.uri,
              type: file.mimeType ?? "image/jpg",
              name: fileName,
            } as unknown as Blob);
          }
        });
      }
      return api({
        url: REQUEST_URL.ADD_COMMENT,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (e: any) => {
      console.error("Error adding comment:", e);
    },
    onSuccess: (data: any) => {
      console.log("Comment added successfully:", data);
    },
  });
  return { addComment, data, error, isPending };
};

export default useAddComment;
