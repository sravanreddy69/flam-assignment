"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"
import { useUserStore } from "@/store/user-store"

export default function FilterPanel() {
  const { users, setDepartmentFilters, setRatingFilters, departmentFilters, ratingFilters, clearFilters } =
    useUserStore()
  const [departments, setDepartments] = useState<string[]>([])

  useEffect(() => {
    // Extract unique departments
    const uniqueDepartments = Array.from(new Set(users.map((user) => user.department).filter(Boolean))) as string[]

    setDepartments(uniqueDepartments)
  }, [users])

  const handleDepartmentChange = (department: string) => {
    if (departmentFilters.includes(department)) {
      setDepartmentFilters(departmentFilters.filter((d) => d !== department))
    } else {
      setDepartmentFilters([...departmentFilters, department])
    }
  }

  const handleRatingChange = (rating: number) => {
    if (ratingFilters.includes(rating)) {
      setRatingFilters(ratingFilters.filter((r) => r !== rating))
    } else {
      setRatingFilters([...ratingFilters, rating])
    }
  }

  const hasActiveFilters = departmentFilters.length > 0 || ratingFilters.length > 0

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-4 w-4 mr-2" />
            Department
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {departments.map((department) => (
            <DropdownMenuCheckboxItem
              key={department}
              checked={departmentFilters.includes(department)}
              onCheckedChange={() => handleDepartmentChange(department)}
            >
              {department}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-4 w-4 mr-2" />
            Performance
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[5, 4, 3, 2, 1].map((rating) => (
            <DropdownMenuCheckboxItem
              key={rating}
              checked={ratingFilters.includes(rating)}
              onCheckedChange={() => handleRatingChange(rating)}
            >
              {rating} {rating === 1 ? "Star" : "Stars"}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" className="h-8" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}

      <div className="flex flex-wrap gap-2 ml-2">
        {departmentFilters.map((dept) => (
          <Badge key={dept} variant="secondary" className="h-8">
            {dept}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 -mr-2"
              onClick={() => handleDepartmentChange(dept)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {dept} filter</span>
            </Button>
          </Badge>
        ))}

        {ratingFilters.map((rating) => (
          <Badge key={rating} variant="secondary" className="h-8">
            {rating} {rating === 1 ? "Star" : "Stars"}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 -mr-2"
              onClick={() => handleRatingChange(rating)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {rating} star filter</span>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
