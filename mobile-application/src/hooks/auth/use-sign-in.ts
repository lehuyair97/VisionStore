import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";
import { signInForm } from "@navigation/config/types";

type signInReponse = {
  isSuccess: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type User = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  favorites: any[];
  address: any[];
  payment_transaction: any[];
  createdAt: string;
  __v: number;
};


const useSignIn = () => {
  const {
    data,
    mutateAsync: submit,
    error,
    isPending: submitting,
    isError,
  } = useMutation({
    mutationFn: async (variables: signInForm) => {
      const res = (await api({
        url: REQUEST_URL.SIGN_IN,
        method: "POST",
        data: variables,
      })) as signInReponse;
      return res;
    },

    onSuccess: () => {
      toast.success("Đăng nhập thành công");
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error?.response?.data?.message);
        } else if (error.response.status === 403) {
          toast.error("Bạn không có quyền truy cập vào tài nguyên này.");
        }
      } else {
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
export default useSignIn;

