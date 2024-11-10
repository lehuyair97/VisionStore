import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";

// Giao diện cho giao dịch thanh toán
interface PaymentTransaction {
  id: string;
  userId: string;
  orderId: string;
  paymentMethod: string;
  paymentStatus: string;
  _id: string;
  paymentDate: string;
}

// Giao diện cho một mục trong giỏ hàng
export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
  description: string;
}

// Giao diện cho đơn hàng
interface Order {
  _id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhoneNumber: number;
  paymentTransactions: PaymentTransaction;
  totalBill: number;
  carts: CartItem[];
  orderDate: string;
  __v: number;
}

// Giao diện cho dữ liệu thêm vào giỏ hàng
interface AddCartType {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhoneNumber: number;
  paymentTransactions: {
    id: string;
    userId: string;
    orderId: string;
    paymentMethod: string;
    paymentStatus: string;
    _id: string;
    paymentDate: string;
  };
  totalBill: number;
  carts: CartItem[];
  orderDate: string;
}

const useAddCart = () => {
  const {
    data,
    error,
    mutate,
    status,
  } = useMutation<any, Error, AddCartType>({
    mutationFn: async (data: AddCartType) => {
      try {
        const res = await api({
          url: REQUEST_URL.GET_CART, 
          method: "POST",
          data: data,
        });
        const responseData = res.data || res;
        return responseData;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success("Product added to cart successfully!");
     
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
    addCart: mutate,
  };
};

export default useAddCart;