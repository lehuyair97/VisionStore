import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useSendMessage = () => {
  const { data, mutateAsync, error, isPending } = useMutation({
    mutationFn: async (data: { idClient: string; content: string }) => {
      return api({
        url: REQUEST_URL.SENT_MESSAGE,
        method: "POST",
        data: data,
      });
    },
  });
  return { data, sendMessage: mutateAsync, error, isPending };
};
export default useSendMessage;
