import { create } from "zustand";
import { persist } from "zustand/middleware";

type PostStore = {
  likedPostIds: number[];
  likePost: (id: number) => void;
  unlikePost: (id: number) => void;
  isLiked: (id: number) => boolean;
};

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      likedPostIds: [],
      likePost: (id) => {
        const current = get().likedPostIds;
        if (!current.includes(id)) {
          set({ likedPostIds: [...current, id] });
        }
      },
      unlikePost: (id) => {
        set((state) => ({
          likedPostIds: state.likedPostIds.filter((postId) => postId !== id),
        }));
      },
      isLiked: (id) => get().likedPostIds.includes(id),
    }),
    {
      name: "liked-posts",
    }
  )
);
