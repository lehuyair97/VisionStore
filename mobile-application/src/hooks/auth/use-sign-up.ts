import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";
import { signInReponse, User } from "./use-sign-in";

const useSignUp = () => {
  const {
    data,
    mutateAsync: submit,
    error,
    isPending: submitting,
    isError,
  } = useMutation({
    mutationFn: async (variables: User) => {
      const res = (await api({
        url: REQUEST_URL.CREATE_USER,
        method: "POST",
        data: variables,
      })) as signInReponse;
      return res;
    },

    onSuccess: () => {
      toast.success("Đăng ký thành công thành công");
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
export default useSignUp;
