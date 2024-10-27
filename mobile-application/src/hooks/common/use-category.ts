import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface Category {
  _id: string;
  name: string;
}

const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.CREATE_CATEGORY,
        method: "GET",
      })) as Category[];
    },
  });
};

export default useCategory;
