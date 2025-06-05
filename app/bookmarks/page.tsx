"use client"

import { useBookmarkStore } from "@/store/bookmark-store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserStore } from "@/store/user-store"

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarkStore()
  const { promoteUser } = useUserStore()
  const [sortBy, setSortBy] = useState("name")

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    if (sortBy === "name") {
      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    } else if (sortBy === "department") {
      return (a.department || "").localeCompare(b.department || "")
    } else if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0)
    }
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Employees</h1>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="department">Sort by Department</SelectItem>
              <SelectItem value="rating">Sort by Rating</SelectItem>
            </SelectContent>
          </Select>
          {bookmarks.length > 0 && (
            <Button variant="outline" onClick={clearBookmarks}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h3 className="text-xl font-medium mb-2">No bookmarked employees</h3>
          <p className="text-muted-foreground mb-4">Bookmark employees to keep track of them here</p>
          <Link href="/">
            <Button>Browse Employees</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedBookmarks.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {user.firstName} {user.lastName}
                      </CardTitle>
                      <CardDescription>{user.department || "No department"}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < user.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline">{user.company?.title || "Position not specified"}</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/employee/${user.id}`}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => promoteUser(user.id)}>
                    <ArrowUpRight className="h-4 w-4 mr-1" /> Promote
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeBookmark(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
