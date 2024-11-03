import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetComment = (variables: string) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["comment", variables],
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_COMMENT(variables),
        method: "GET",
      });
    },
  });
  return { data, error, isPending };
};

export default useGetComment;
