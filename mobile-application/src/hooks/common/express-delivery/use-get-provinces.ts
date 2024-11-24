import { useQuery } from "@tanstack/react-query";
import GHN_API, { GHN_LOCATION_API } from "@utils/express-delivery-api";

const useGetProvinces = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["Provinces"],
    queryFn: async () => {
      return await GHN_LOCATION_API({
        url: "/master-data/province",
        method: "GET",
      });
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
  };
};

export default useGetProvinces;
