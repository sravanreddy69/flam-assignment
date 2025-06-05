"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useUserStore } from "@/store/user-store"

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useUserStore()
  const [value, setValue] = useState(searchQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(value)
  }

  const handleClear = () => {
    setValue("")
    setSearchQuery("")
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm md:w-80">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by name, email, department..."
        className="w-full pl-8 pr-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-9 w-9"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </form>
  )
}
