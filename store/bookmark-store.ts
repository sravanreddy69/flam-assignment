"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types/user"

interface BookmarkState {
  bookmarks: User[]
  isBookmarked: (id: number) => boolean
  toggleBookmark: (user: User) => void
  removeBookmark: (id: number) => void
  clearBookmarks: () => void
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      isBookmarked: (id: number) => {
        return get().bookmarks.some((bookmark) => bookmark.id === id)
      },

      toggleBookmark: (user: User) => {
        const isAlreadyBookmarked = get().isBookmarked(user.id)

        if (isAlreadyBookmarked) {
          set((state) => ({
            bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== user.id),
          }))
        } else {
          set((state) => ({
            bookmarks: [...state.bookmarks, user],
          }))
        }
      },

      removeBookmark: (id: number) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
        }))
      },

      clearBookmarks: () => {
        set({ bookmarks: [] })
      },
    }),
    {
      name: "hr-dashboard-bookmarks",
    },
  ),
)
