import { CommonContext } from "@context/common-context";
import { useContext } from "react";

const useCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("useCommon must be used within a CommonProvider");
  }

  return context;
};

export default useCommon;
