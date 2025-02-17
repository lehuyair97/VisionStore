import { useQuery } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";


export interface Cart {
  products: any;
  _id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhoneNumber: number;
  optionsColor: string;
  optionsMemory: string;
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
  carts: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image?: string; // optional field
    description?: string; // optional field
  }[];
  orderDate: string;
  __v: number;
}

const useGetCart = (customerId:string) => {
  const {data, isPending, error, isLoading} = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return (await api({
        url: REQUEST_URL.GET_CART_BY_USERID(customerId),
        method: "GET",
      })) as Cart;
    },
  });
  return { data: data, isPending, error, isLoading };
};

export default useGetCart;
