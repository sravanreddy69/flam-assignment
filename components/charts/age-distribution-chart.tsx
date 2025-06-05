"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { User } from "@/types/user"

interface AgeDistributionChartProps {
  users: User[]
}

export default function AgeDistributionChart({ users }: AgeDistributionChartProps) {
  const chartData = useMemo(() => {
    // Create age ranges
    const ageRanges = [
      { range: "18-25", min: 18, max: 25, count: 0 },
      { range: "26-35", min: 26, max: 35, count: 0 },
      { range: "36-45", min: 36, max: 45, count: 0 },
      { range: "46-55", min: 46, max: 55, count: 0 },
      { range: "56+", min: 56, max: 100, count: 0 },
    ]

    // Count users in each age range
    users.forEach((user) => {
      const age = user.age
      const range = ageRanges.find((r) => age >= r.min && age <= r.max)
      if (range) {
        range.count++
      }
    })

    return ageRanges
  }, [users])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" name="Employees" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
