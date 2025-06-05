"use client"

import { useMemo } from "react"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts"
import type { User } from "@/types/user"

interface BookmarkTrendsChartProps {
  users: User[]
  bookmarks: User[]
}

export default function BookmarkTrendsChart({ users, bookmarks }: BookmarkTrendsChartProps) {
  const departmentData = useMemo(() => {
    const departmentMap = new Map<string, { bookmarked: number; total: number }>()

    users.forEach((user) => {
      if (!user.department) return

      const dept = user.department

      if (!departmentMap.has(dept)) {
        departmentMap.set(dept, { bookmarked: 0, total: 0 })
      }

      const deptData = departmentMap.get(dept)!
      deptData.total += 1

      if (bookmarks.some((b) => b.id === user.id)) {
        deptData.bookmarked += 1
      }
    })

    return Array.from(departmentMap.entries())
      .map(([name, data]) => ({
        name,
        value: data.bookmarked,
        percentage: (data.bookmarked / data.total) * 100,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
  }, [users, bookmarks])

  const ratingData = useMemo(() => {
    const ratingMap = new Map<number, number>()

    bookmarks.forEach((user) => {
      const rating = user.rating || 0

      if (!ratingMap.has(rating)) {
        ratingMap.set(rating, 0)
      }

      ratingMap.set(rating, ratingMap.get(rating)! + 1)
    })

    return Array.from(ratingMap.entries())
      .map(([rating, count]) => ({
        name: `${rating} Star${rating !== 1 ? "s" : ""}`,
        value: count,
      }))
      .sort((a, b) => {
        const ratingA = Number.parseInt(a.name.split(" ")[0])
        const ratingB = Number.parseInt(b.name.split(" ")[0])
        return ratingB - ratingA
      })
  }, [bookmarks])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div>
        <h3 className="text-sm font-medium text-center mb-2">Bookmarks by Department</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} (${percentage.toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-medium text-center mb-2">Bookmarks by Rating</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={ratingData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} (${value})`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {ratingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
