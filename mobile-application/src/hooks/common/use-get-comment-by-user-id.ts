import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetCommnetByUserId = (userID: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["comment", userID],
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_COMMENT_BY_USER_ID(userID),
        method: "GET",
      });
    },
  });
  return { data, error, isPending };
};

export default useGetCommnetByUserId;
