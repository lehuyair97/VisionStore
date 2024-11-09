import { toast } from "@components";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { signInReponse } from "./use-sign-in";
import api, { REQUEST_URL } from "@utils/api";
import { useMutation } from "@tanstack/react-query";

const useSignInGoogle = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "796239183008-229vcarahasokpb1hm3nnve5jl3s5vse.apps.googleusercontent.com", // Sử dụng client_id từ Firebase
    });
  }, []);
  const getToken = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      return user?.data?.idToken;
    } catch (e) {
      console.error("Sign in error: ", e);
      return null;
    }
  };

  const {
    data,
    mutateAsync: submit,
    error,
    isPending: submitting,
    isError,
  } = useMutation({
    mutationFn: async (device_token: string) => {
      const token = await getToken();
      const res = (await api({
        url: REQUEST_URL.SIGN_IN_WITH_GOOGLE,
        method: "POST",
        data: { token: token, device_token: device_token },
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
export default useSignInGoogle;
