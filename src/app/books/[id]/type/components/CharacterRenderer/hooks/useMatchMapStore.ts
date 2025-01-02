import { create } from "zustand";

interface MatchMapStoreProps {
  matchMap: Map<number, number>;
  setMatchMap: (
    matchMap:
      | Map<number, number>
      | ((prev: Map<number, number>) => Map<number, number>)
  ) => void;
}

// Handle state outside component tree to avoid re-rendering
export const useMatchMapStore = create<MatchMapStoreProps>((set, get) => ({
  matchMap: new Map(),
  setMatchMap: (matchMapOrUpdater) =>
    set({
      matchMap:
        typeof matchMapOrUpdater === "function"
          ? matchMapOrUpdater(get().matchMap)
          : matchMapOrUpdater,
    }),
}));
