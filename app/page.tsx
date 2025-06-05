"use client"

import { useEffect } from "react"
import { useUserStore } from "@/store/user-store"
import UserCard from "@/components/user-card"
import SearchBar from "@/components/search-bar"
import FilterPanel from "@/components/filter-panel"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { users, loading, fetchUsers, filteredUsers } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <SearchBar />
      </div>

      <FilterPanel />

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
