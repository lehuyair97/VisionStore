import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

type refreshTokenType = {
  accessToken: string;
  refreshToken: string;
};

const useRefreshToken = () => {
  const {
    data,
    mutateAsync: submit,
    error,
    isPending: submitting,
    isError,
  } = useMutation({
    mutationFn: async (token: string) => {
      const res = (await api({
        url: REQUEST_URL.REFRESH_TOKEN,
        method: "POST",
        data: { token: token },
      })) as refreshTokenType;
      return res;
    },

    onSuccess: (data) => {
    },
    onError: (error: any) => {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      }
    },
    networkMode: "always",
  });
  return {
    data,
    submit,
    error,
    isError,
    submitting,
  };
};
export default useRefreshToken;
