import { useState } from "react";
import useChangeQuantityCart from "../use-change-quantity-cart";
import { useAuth } from "@hooks/auth";
interface UseQuantityProps {
  initialQuantity?: number;
}

const useQuantity = ({ initialQuantity = null }: UseQuantityProps) => {
  const { submitChangeQuantity } = useChangeQuantityCart();
  const { userInfo } = useAuth();

  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = async (productId?: string, isFetch?: boolean) => {
    setQuantity((prev) => prev + 1);
    isFetch &&
      productId &&
      (await submitChangeQuantity({
        customerId: userInfo?._id,
        action: "increase",
        quantity: 1,
        productId: productId,
      }));
  };
  const decreaseQuantity = async (productId?: string, isFetch?: boolean) => {
    setQuantity((prev) => Math.max(1, prev - 1));
    isFetch &&
      productId &&
      (await submitChangeQuantity({
        customerId: userInfo?._id,
        action: "decrease",
        quantity: 1,
        productId: productId,
      }));
  };

  return { quantity, increaseQuantity, decreaseQuantity };
};

export default useQuantity;
