import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";

export interface PaymentOrder {
  vnp_Version?: string;
  vnp_Command?: string;
  vnp_TMN_CODE?: string;
  vnp_Locale?: string;
  vnp_CurrCode?: string;
  vnp_TxnRef?: string;
  vnp_OrderInfo?: string;
  vnp_OrderType?: string;
  vnp_Amount?: number;
  vnp_ReturnUrl?: string;
  vnp_IpAddr?: string;
  vnp_CreateDate?: string;
}

const useCreatePaymentOrder = () => {
  const { mutateAsync, data, isPending, error, isSuccess } = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await api({
        url: REQUEST_URL.CREATE_PAYMENT_ORDER,
        method: "POST",
        data: orderData,
      });
      return response;
    },
    onError: (err: Error) => {
      console.error("Payment order creation failed:", err);
    },
  });

  return { createOrder: mutateAsync, isPending, error, isSuccess };
};

export default useCreatePaymentOrder;
