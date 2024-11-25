import { useQuery } from "@tanstack/react-query";
import GHN_API, { GHN_LOCATION_API } from "@utils/express-delivery-api";

const useGetWards = (districtId: number) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["Wards", districtId],
    queryFn: async () => {
      return await GHN_LOCATION_API({
        url: "/master-data/ward",
        method: "POST",
        data: {
          district_id: districtId, 
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

export default useGetWards;
