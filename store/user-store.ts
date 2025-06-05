"use client"

import { create } from "zustand"
import type { User } from "@/types/user"

interface UserState {
  users: User[]
  loading: boolean
  searchQuery: string
  departmentFilters: string[]
  ratingFilters: number[]
  filteredUsers: User[]

  fetchUsers: () => Promise<void>
  fetchUserById: (id: number) => Promise<User | undefined>
  getUserById: (id: number) => User | undefined
  setSearchQuery: (query: string) => void
  setDepartmentFilters: (departments: string[]) => void
  setRatingFilters: (ratings: number[]) => void
  clearFilters: () => void
  promoteUser: (id: number) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  searchQuery: "",
  departmentFilters: [],
  ratingFilters: [],
  filteredUsers: [],

  fetchUsers: async () => {
    set({ loading: true })
    try {
      const response = await fetch("https://dummyjson.com/users?limit=20")
      const data = await response.json()

      // Add random departments and ratings to users
      const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Product", "Design"]
      const enhancedUsers = data.users.map((user: User) => ({
        ...user,
        department: user.company?.department || departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1-5
      }))

      set({
        users: enhancedUsers,
        filteredUsers: enhancedUsers,
        loading: false,
      })
    } catch (error) {
      console.error("Error fetching users:", error)
      set({ loading: false })
    }
  },

  fetchUserById: async (id: number) => {
    const existingUser = get().users.find((user) => user.id === id)
    if (existingUser) return existingUser

    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`)
      const user = await response.json()

      // Add random department and rating
      const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Product", "Design"]
      const enhancedUser = {
        ...user,
        department: user.company?.department || departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1-5
      }

      set((state) => ({
        users: [...state.users.filter((u) => u.id !== id), enhancedUser],
      }))

      return enhancedUser
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      return undefined
    }
  },

  getUserById: (id: number) => {
    return get().users.find((user) => user.id === id)
  },

  setSearchQuery: (query: string) => {
    set((state) => {
      const filteredUsers = applyFilters(state.users, query, state.departmentFilters, state.ratingFilters)
      return { searchQuery: query, filteredUsers }
    })
  },

  setDepartmentFilters: (departments: string[]) => {
    set((state) => {
      const filteredUsers = applyFilters(state.users, state.searchQuery, departments, state.ratingFilters)
      return { departmentFilters: departments, filteredUsers }
    })
  },

  setRatingFilters: (ratings: number[]) => {
    set((state) => {
      const filteredUsers = applyFilters(state.users, state.searchQuery, state.departmentFilters, ratings)
      return { ratingFilters: ratings, filteredUsers }
    })
  },

  clearFilters: () => {
    set((state) => ({
      departmentFilters: [],
      ratingFilters: [],
      filteredUsers: applyFilters(state.users, state.searchQuery, [], []),
    }))
  },

  promoteUser: (id: number) => {
    // In a real app, this would call an API to promote the user
    alert(`User ${id} has been promoted!`)
  },
}))

// Helper function to apply all filters
function applyFilters(
  users: User[],
  searchQuery: string,
  departmentFilters: string[],
  ratingFilters: number[],
): User[] {
  return users.filter((user) => {
    // Apply search query filter
    const matchesSearch =
      searchQuery === "" ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()))

    // Apply department filter
    const matchesDepartment =
      departmentFilters.length === 0 || (user.department && departmentFilters.includes(user.department))

    // Apply rating filter
    const matchesRating =
      ratingFilters.length === 0 || (user.rating !== undefined && ratingFilters.includes(user.rating))

    return matchesSearch && matchesDepartment && matchesRating
  })
}
