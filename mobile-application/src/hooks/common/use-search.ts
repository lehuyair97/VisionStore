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
        console.log('Full API response:', res);
        const responseData = res.data || res;
        console.log('API response data:', responseData);
        return responseData;
      } catch (err) {
        console.error('API call failed:', err);
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success("Products found successfully!");
      console.log("Found products:", data);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      console.error('Mutation error:', error);
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
