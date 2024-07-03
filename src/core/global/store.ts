import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GlobalState = {
  isMounted: boolean;
};

type GlobalStore = {
  mount: () => void;
};

const useGlobalStore = create<GlobalState & GlobalStore>()(
  devtools((set) => ({
    isMounted: false,
    mount: () => {
      set(() => ({ isMounted: true }));
    },
  })),
);

export { useGlobalStore };
