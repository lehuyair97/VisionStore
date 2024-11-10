import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

const useGetActiveVoucher = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["active-vouchers"],
    queryFn: async () => {
      return await api({
        url: REQUEST_URL.GET_ACTIVE_VOUCHERS,
        method: "GET",
      });
    },
  });
  return { data, error, isPending };
};

export default useGetActiveVoucher;
