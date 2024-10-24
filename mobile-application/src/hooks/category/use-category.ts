import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface Category {
  _id: string;
  name: string;
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE0YjVhN2Q5Y2MxZTExNWUyY2E0MjUiLCJlbWFpbCI6InRoYW9AZ21haWwuY29tIiwiaWF0IjoxNzI5NTE2ODE3LCJleHAiOjE3Mjk1MTc3MTd9.zk10zpJ8uthfvcYoQxgqJtdd2Vluc3-oSLrjndo4iOc";

const useCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await api({
        url: REQUEST_URL.CATEGORY,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    },
  });
};

export default useCategory;
