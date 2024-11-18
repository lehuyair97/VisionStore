import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";
const useSearchProductsOfComponent = (sub_category_id: string) => {
  const { data, error, mutateAsync, status } = useMutation({
    mutationFn: async (textSearch: string) => {
      try {
        const res = await api({
          url: REQUEST_URL.SEARCH_PRODUCT_OF_COMPONENT(sub_category_id),
          method: "POST",
          data: { name: textSearch },
        });
        const responseData = res.data || res;
        return responseData;
      } catch (err) {
        console.error("API call failed:", err);
        throw err;
      }
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    networkMode: "always",
  });

  const isLoading = status === "pending";

  return {
    data,
    error,
    isLoading,
    search: mutateAsync,
  };
};

export default useSearchProductsOfComponent;
