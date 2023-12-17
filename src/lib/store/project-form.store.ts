import { create } from "zustand";

type Step = 1 | 2;

type State = {
  step: Step;
};

type Action = {
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
};

export const useProjectFormStore = create<State & Action>()((set) => ({
  step: 1,
  goNext: () => set({ step: 2 }),
  goBack: () => set({ step: 1 }),
  reset: () => set({ step: 1 }),
}));
