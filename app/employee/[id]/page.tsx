"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useUserStore } from "@/store/user-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBookmarkStore } from "@/store/bookmark-store"
import EmployeeProjects from "@/components/employee-projects"
import EmployeeFeedback from "@/components/employee-feedback"

export default function EmployeeDetail() {
  const { id } = useParams()
  const { getUserById, fetchUserById } = useUserStore()
  const { isBookmarked, toggleBookmark } = useBookmarkStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      if (id) {
        await fetchUserById(Number(id))
        setLoading(false)
      }
    }

    loadUser()
  }, [id, fetchUserById])

  const user = getUserById(Number(id))

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const bookmarked = isBookmarked(user.id)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Employee Profile</h1>
        <Button variant={bookmarked ? "default" : "outline"} onClick={() => toggleBookmark(user)}>
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={user.image || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">
              {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription>{user.department || "Department not assigned"}</CardDescription>
            <div className="flex items-center mt-2">
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
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-sm">
                {user.address.address}, {user.address.city}
              </span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-sm">{user.company?.title || "Not specified"}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-sm">{user.university || "Not specified"}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-sm">Age: {user.age}</span>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {(user.skills || ["Communication", "Leadership", "Problem Solving"]).map((skill, i) => (
                  <Badge key={i} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {user.firstName} {user.lastName} is a {user.age} year old professional working in the{" "}
                    {user.department || "company"}.
                    {user.company?.title && ` Currently holds the position of ${user.company.title}.`}
                    {user.university && ` Graduate from ${user.university}.`}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Productivity</span>
                          <span>{Math.floor(Math.random() * 30) + 70}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Team Collaboration</span>
                          <span>{Math.floor(Math.random() * 30) + 70}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Goal Completion</span>
                          <span>{Math.floor(Math.random() * 30) + 70}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="min-w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {["Completed training", "Submitted report", "Attended meeting"][i - 1]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="mt-4">
              <EmployeeProjects userId={user.id} />
            </TabsContent>

            <TabsContent value="feedback" className="mt-4">
              <EmployeeFeedback userId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
