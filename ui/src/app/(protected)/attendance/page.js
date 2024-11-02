"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const student = {
  id: "1",
  name: "Jane Doe",
  grade: "10th",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
}

const lectureSchedule = [
  { id: 1, subject: "Mathematics", faculty: "Dr. Smith", startTime: "08:00", endTime: "09:00", color: "bg-blue-500" },
  { id: 2, subject: "Physics", faculty: "Prof. Johnson", startTime: "09:15", endTime: "10:15", color: "bg-green-500" },
  { id: 3, subject: "Chemistry", faculty: "Dr. Williams", startTime: "10:30", endTime: "11:30", color: "bg-yellow-500" },
  { id: 4, subject: "English", faculty: "Ms. Brown", startTime: "12:00", endTime: "13:00", color: "bg-purple-500" },
  { id: 5, subject: "History", faculty: "Mr. Davis", startTime: "13:15", endTime: "14:15", color: "bg-red-500" },
  { id: 6, subject: "Computer Science", faculty: "Prof. Wilson", startTime: "14:30", endTime: "15:30", color: "bg-indigo-500" },
]

const generateAttendanceData = (startDate, endDate) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  return days.map(day => ({
    date: day,
    lectures: lectureSchedule.map(lecture => ({
      ...lecture,
      present: Math.random() > 0.2,
    })),
  }))
}

export default function StudentAttendance() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const startDate = startOfMonth(currentMonth)
  const endDate = endOfMonth(currentMonth)
  const attendanceData = generateAttendanceData(startDate, endDate)

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const calculateAttendancePercentage = () => {
    const totalLectures = attendanceData.length * 6
    const attendedLectures = attendanceData.reduce(
      (sum, day) => sum + day.lectures.filter(lecture => lecture.present).length,
      0
    )
    return (attendedLectures / totalLectures) * 100
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarImage src={student.avatarUrl} alt={student.name} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{student.name}</CardTitle>
              <CardDescription className="text-lg">Grade: {student.grade}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium text-lg">{format(currentMonth, "MMMM yyyy")}</span>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <div className="space-y-4">
              <AnimatePresence>
                {attendanceData.map((day, index) => (
                  <motion.div
                    key={day.date.toISOString()}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Collapsible>
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full">
                          <CardHeader className="py-2 flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-5 w-5 text-muted-foreground" />
                              <CardTitle className="text-sm font-medium">
                                {format(day.date, "EEEE, MMMM d")}
                              </CardTitle>
                            </div>
                            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="p-0">
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                              {day.lectures.map(lecture => (
                                <div key={lecture.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center space-x-4">
                                    <div className={`w-2 h-12 rounded-full ${lecture.color}`} />
                                    <div>
                                      <h4 className="font-semibold">{lecture.subject}</h4>
                                      <p className="text-sm text-muted-foreground">{lecture.faculty}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {lecture.startTime} - {lecture.endTime}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge
                                    variant={lecture.present ? "default" : "secondary"}
                                    className={`text-xs ${lecture.present ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                                  >
                                    {lecture.present ? "Present" : "Absent"}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Overall Attendance</span>
                    <span className="text-2xl font-bold">{calculateAttendancePercentage().toFixed(2)}%</span>
                  </div>
                  <Progress value={calculateAttendancePercentage()} className="w-full h-4" />
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {lectureSchedule.map(lecture => (
                      <div key={lecture.id} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${lecture.color}`} />
                        <span className="text-sm font-medium">{lecture.subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}