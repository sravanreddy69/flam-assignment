"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/store/user-store"
import { useBookmarkStore } from "@/store/bookmark-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import DepartmentRatingsChart from "@/components/charts/department-ratings-chart"
import BookmarkTrendsChart from "@/components/charts/bookmark-trends-chart"
import PerformanceDistributionChart from "@/components/charts/performance-distribution-chart"
import AgeDistributionChart from "@/components/charts/age-distribution-chart"

export default function AnalyticsPage() {
  const { users, loading, fetchUsers } = useUserStore()
  const { bookmarks } = useBookmarkStore()

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers()
    }
  }, [users.length, fetchUsers])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Calculate some basic stats
  const totalEmployees = users.length
  const avgRating = users.reduce((sum, user) => sum + (user.rating || 0), 0) / totalEmployees
  const departmentCount = new Set(users.map((user) => user.department)).size
  const bookmarkRate = (bookmarks.length / totalEmployees) * 100

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">HR Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Employees</CardDescription>
            <CardTitle className="text-3xl">{totalEmployees}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Rating</CardDescription>
            <CardTitle className="text-3xl">{avgRating.toFixed(1)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Departments</CardDescription>
            <CardTitle className="text-3xl">{departmentCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Bookmark Rate</CardDescription>
            <CardTitle className="text-3xl">{bookmarkRate.toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
              <CardDescription>Distribution of employee performance ratings across the organization</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <PerformanceDistributionChart users={users} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Ratings</CardTitle>
              <CardDescription>Average performance ratings by department</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <DepartmentRatingsChart users={users} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookmark Trends</CardTitle>
              <CardDescription>Analysis of bookmarked employees by department and rating</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BookmarkTrendsChart users={users} bookmarks={bookmarks} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Age Distribution</CardTitle>
              <CardDescription>Distribution of employee ages across the organization</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <AgeDistributionChart users={users} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
