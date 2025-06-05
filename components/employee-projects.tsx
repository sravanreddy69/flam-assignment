"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Project {
  id: number
  name: string
  description: string
  status: "Not Started" | "In Progress" | "Completed" | "On Hold"
  progress: number
  dueDate: string
  tags: string[]
}

interface EmployeeProjectsProps {
  userId: number
}

export default function EmployeeProjects({ userId }: EmployeeProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Mock data - in a real app, you would fetch this from an API
    const mockProjects: Project[] = [
      {
        id: 1,
        name: "Website Redesign",
        description: "Redesigning the company website with modern UI/UX principles",
        status: "In Progress",
        progress: 65,
        dueDate: "2023-12-15",
        tags: ["Design", "Frontend"],
      },
      {
        id: 2,
        name: "Mobile App Development",
        description: "Creating a mobile app for internal communication",
        status: "Not Started",
        progress: 0,
        dueDate: "2024-02-28",
        tags: ["Mobile", "Development"],
      },
      {
        id: 3,
        name: "Annual Report",
        description: "Preparing the annual financial and performance report",
        status: "Completed",
        progress: 100,
        dueDate: "2023-10-30",
        tags: ["Finance", "Reporting"],
      },
    ]

    setProjects(mockProjects)
  }, [userId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-muted text-muted-foreground"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "On Hold":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Due Date: </span>
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No projects assigned to this employee.</p>
        </div>
      )}
    </div>
  )
}
