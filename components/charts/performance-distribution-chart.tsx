"use client"

import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { User } from "@/types/user"

interface PerformanceDistributionChartProps {
  users: User[]
}

export default function PerformanceDistributionChart({ users }: PerformanceDistributionChartProps) {
  const chartData = useMemo(() => {
    const ratingCounts = [0, 0, 0, 0, 0]

    users.forEach((user) => {
      if (user.rating && user.rating >= 1 && user.rating <= 5) {
        ratingCounts[user.rating - 1]++
      }
    })

    return [
      { name: "1 Star", count: ratingCounts[0] },
      { name: "2 Stars", count: ratingCounts[1] },
      { name: "3 Stars", count: ratingCounts[2] },
      { name: "4 Stars", count: ratingCounts[3] },
      { name: "5 Stars", count: ratingCounts[4] },
    ]
  }, [users])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" name="Employees" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
