import { useRef, useState } from "react";

type TabState = {
  params?: string;
  defaultIndex?: number;
};
export function useTabState<PageRef, T = unknown>(
  routesProps: T[],
  props?: TabState
) {
  const defaultIndex = props?.defaultIndex ?? 0;

  const [index, setIndex] = useState(defaultIndex);
  const [routes, setRoute] = useState(routesProps);

  const tabRefs = useRef<PageRef[] | null[]>([]);

  return {
    index,
    setIndex,
    routes,
    setRoute,
    currentTab: tabRefs?.current[index] ?? undefined,
    tabRefs,
  };
}
