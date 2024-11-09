import { useState } from "react";

interface UseQuantityProps {
  initialQuantity?: number;
}

const useQuantity = ({ initialQuantity = 1 }: UseQuantityProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return { quantity, increaseQuantity, decreaseQuantity };
};

export default useQuantity;