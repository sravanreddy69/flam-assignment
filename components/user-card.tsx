"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Bookmark, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useBookmarkStore } from "@/store/bookmark-store"
import { useUserStore } from "@/store/user-store"
import type { User } from "@/types/user"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarkStore()
  const { promoteUser } = useUserStore()

  const bookmarked = isBookmarked(user.id)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{user.department || "No department"}</p>
            </div>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < user.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium truncate max-w-[180px]">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Age:</span>
            <span className="font-medium">{user.age}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Position:</span>
            <Badge variant="outline">{user.company?.title || "Not specified"}</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/employee/${user.id}`}>
            <Eye className="h-4 w-4 mr-1" /> View
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant={bookmarked ? "default" : "outline"} size="sm" onClick={() => toggleBookmark(user)}>
            <Bookmark className="h-4 w-4 mr-1" /> {bookmarked ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => promoteUser(user.id)}>
            <ArrowUpRight className="h-4 w-4 mr-1" /> Promote
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
