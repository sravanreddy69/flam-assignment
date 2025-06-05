"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { User } from "@/types/user"

interface DepartmentRatingsChartProps {
  users: User[]
}

export default function DepartmentRatingsChart({ users }: DepartmentRatingsChartProps) {
  const chartData = useMemo(() => {
    const departmentMap = new Map<string, { count: number; totalRating: number }>()

    users.forEach((user) => {
      if (!user.department) return

      const dept = user.department
      const rating = user.rating || 0

      if (!departmentMap.has(dept)) {
        departmentMap.set(dept, { count: 0, totalRating: 0 })
      }

      const deptData = departmentMap.get(dept)!
      deptData.count += 1
      deptData.totalRating += rating
    })

    return Array.from(departmentMap.entries())
      .map(([department, data]) => ({
        department,
        averageRating: data.totalRating / data.count,
        employeeCount: data.count,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
  }, [users])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="department" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 5]} />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="averageRating" name="Average Rating" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="employeeCount" name="Employee Count" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
