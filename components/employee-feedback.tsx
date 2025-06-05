"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Feedback {
  id: number
  author: {
    name: string
    role: string
    avatar: string
  }
  date: string
  content: string
  type: "praise" | "improvement" | "general"
}

interface EmployeeFeedbackProps {
  userId: number
}

export default function EmployeeFeedback({ userId }: EmployeeFeedbackProps) {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [newFeedback, setNewFeedback] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Mock data - in a real app, you would fetch this from an API
    const mockFeedback: Feedback[] = [
      {
        id: 1,
        author: {
          name: "John Smith",
          role: "Team Lead",
          avatar: "/placeholder-user.jpg",
        },
        date: "2023-11-15",
        content:
          "Excellent work on the Q3 project. Your attention to detail and problem-solving skills were instrumental in meeting our deadlines.",
        type: "praise",
      },
      {
        id: 2,
        author: {
          name: "Sarah Johnson",
          role: "HR Manager",
          avatar: "/placeholder-user.jpg",
        },
        date: "2023-10-22",
        content:
          "Consider taking more initiative in team meetings. Your insights are valuable and should be shared more often.",
        type: "improvement",
      },
      {
        id: 3,
        author: {
          name: "Michael Chen",
          role: "Department Head",
          avatar: "/placeholder-user.jpg",
        },
        date: "2023-09-05",
        content: "Consistently delivers high-quality work and maintains a positive attitude. A valuable team member.",
        type: "general",
      },
    ]

    setFeedback(mockFeedback)
  }, [userId])

  const handleSubmitFeedback = () => {
    if (!newFeedback.trim()) return

    const newFeedbackItem: Feedback = {
      id: feedback.length + 1,
      author: {
        name: "You",
        role: "HR Admin",
        avatar: "/placeholder-user.jpg",
      },
      date: new Date().toISOString().split("T")[0],
      content: newFeedback,
      type: "general",
    }

    setFeedback([newFeedbackItem, ...feedback])
    setNewFeedback("")

    toast({
      title: "Feedback submitted",
      description: "Your feedback has been added successfully.",
    })
  }

  const getFeedbackTypeStyles = (type: string) => {
    switch (type) {
      case "praise":
        return "border-l-4 border-green-500"
      case "improvement":
        return "border-l-4 border-amber-500"
      default:
        return "border-l-4 border-blue-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Feedback</CardTitle>
          <CardDescription>Provide constructive feedback for this employee</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your feedback here..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {feedback.map((item) => (
          <Card key={item.id} className={getFeedbackTypeStyles(item.type)}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                  <AvatarFallback>{item.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{item.author.name}</CardTitle>
                  <CardDescription>
                    {item.author.role} • {new Date(item.date).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{item.content}</p>
            </CardContent>
          </Card>
        ))}

        {feedback.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No feedback available for this employee.</p>
          </div>
        )}
      </div>
    </div>
  )
}
