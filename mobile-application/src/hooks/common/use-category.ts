import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface Category {
  _id: string;
  name: string;
  type: string
}

const useCategory = () => {
  const {data, isPending,error, isLoading} = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.CREATE_CATEGORY,
        method: "GET",
      })) as Category[];
    },
  });
  return { data, isPending, error, isLoading };
};

export default useCategory;
