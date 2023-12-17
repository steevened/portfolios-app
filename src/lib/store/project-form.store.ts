import { create } from "zustand";

type Step = {
  current: 1 | 2;
  state: {
    1: "default" | "saved" | "completed";
    2: "default" | "saved" | "completed";
  };
};

type State = {
  step: Step;
};

type Action = {
  setSaved: (step: 1 | 2) => void;
  setCompleted: (step: 1 | 2) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
};

export const useProjectFormStore = create<State & Action>()((set) => ({
  step: {
    current: 1,
    state: {
      1: "default",
      2: "default",
    },
  },
  setSaved: (step) =>
    set((state) => ({
      step: { ...state.step, state: { ...state.step.state, [step]: "saved" } },
    })),
  setCompleted: (step) =>
    set((state) => ({
      step: {
        ...state.step,
        state: { ...state.step.state, [step]: "completed" },
      },
    })),
  goNext: () =>
    set({
      step: {
        current: 2,
        state: {
          1: "completed",
          2: "default",
        },
      },
    }),
  goBack: () =>
    set({
      step: {
        current: 1,
        state: {
          1: "saved",
          2: "default",
        },
      },
    }),
  reset: () =>
    set({
      step: {
        current: 1,
        state: {
          1: "default",
          2: "default",
        },
      },
    }),
}));
