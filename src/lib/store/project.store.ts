import { create } from "zustand";

type State = {
  project: {
    id: string;
    isCommentsOpen: boolean;
  };
};

type Action = {
  toggleCommentsOpen: (projectId: string) => void;
};

export const useProjectStore = create<State & Action>()((set) => ({
  project: {
    id: "",
    isCommentsOpen: false,
  },
  toggleCommentsOpen: (projectId) =>
    set((state) => ({
      project: { id: projectId, isCommentsOpen: !state.project.isCommentsOpen },
    })),
}));
