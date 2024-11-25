import { queryClient } from "./../../utils/helper";
import { toast } from "@components";
import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import { Helper } from "@utils/helper";
import { useQueryClient } from "@tanstack/react-query";
const useUpdateAvatar = (userID: string) => {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    isPending,
    mutateAsync: updateAvatar,
  } = useMutation({
    mutationFn: async (image: any) => {
      const formData = new FormData();
      formData.append("avatar", {
        uri: image?.uri,
        type: image?.mimeType ?? "image/jpg",
        name: image?.fileName,
      } as unknown as Blob);
      return api({
        url: REQUEST_URL.UPDATE_AVATAR(userID),
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (e: any) => {
      console.error("error:", e);
    },
    onSuccess: (data: any) => {
      toast.success("Updated avatar successfully!");
    },
    onSettled: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["UserProfile", userID] });
      }
    },
  });
  return { updateAvatar, data, error, isPending };
};

export default useUpdateAvatar;
