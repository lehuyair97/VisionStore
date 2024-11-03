import { createContext, useMemo, useState } from "react";

export const CommonContext = createContext<any>(undefined);
export const CommonProvider = ({ children }) => {
  const [categoryIDSelected, setCategoryIDSelected] = useState("");
  const value = useMemo(() => {
    ({
      categoryIDSelected,
      setCategoryIDSelected,
    });
  }, [categoryIDSelected, setCategoryIDSelected]);
  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};
