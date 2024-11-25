import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";
const useSearch = () => {
  const {
    data,
    error,
    mutate,
    status, 
  } = useMutation<any, Error, string>({
    mutationFn: async (name: string) => {
      try {
        const res = await api({
          url: REQUEST_URL.SEARCH,
          method: "POST",
          data: { name },
        });
        const responseData = res.data || res;
        return responseData;
      } catch (err) {
        console.error('API call failed:', err);
        throw err;
      }
    },
    onSuccess: (data) => {
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    networkMode: "always",
  });

  const isLoading = status === 'pending';

  return {
    data,
    error,
    isLoading,
    search: mutate, 
  };
};

export default useSearch;
