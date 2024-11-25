import { useQuery } from "@tanstack/react-query";
import GHN_API, { GHN_LOCATION_API } from "@utils/express-delivery-api";

const useGetDistricts = (provinceId: number) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["Districts", provinceId],
    queryFn: async () => {
      return await GHN_LOCATION_API({
        url: "/master-data/district",
        method: "POST",
        data: {
          province_id: provinceId,
        },
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

export default useGetDistricts;
