'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin, User, Book, Zap } from "lucide-react"
import { motion } from "framer-motion"

const formatTimeDifference = (timeDiff) => {
  const hours = Math.floor(timeDiff / 3600000);
  const minutes = Math.floor((timeDiff % 3600000) / 60000);
  const seconds = Math.floor((timeDiff % 60000) / 1000);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else if (minutes > 0) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `00:${seconds.toString().padStart(2, '0')}`;
  }
};

export default function StudentLectures({ lectures = [] }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) 

    return () => clearInterval(timer)
  }, [])

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getNextLectureInfo = () => {
    const upcomingLectures = lectures.filter(lecture => new Date(lecture.startFrom) > currentTime)
    if (upcomingLectures.length === 0) return "No upcoming lectures"
    
    const nextLecture = upcomingLectures[0]
    const timeDiff = new Date(nextLecture.startFrom) - currentTime
    const minutesDiff = Math.floor(timeDiff / 60000)

    if (minutesDiff < 60) {
      return `Next lecture in ${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`
    } else {
      const hoursDiff = Math.floor(minutesDiff / 60)
      return `Next lecture in ${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''}`
    }
  }

  if (!lectures || lectures.length === 0) {
    return (
      <Card className="w-full max-w-7xl mx-auto overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No lectures available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture, index) => (
          <Card key={index} className="overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-xl font-bold text-center text-primary">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {lecture.subject || 'Untitled Lecture'}
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <motion.div 
                className="flex justify-between items-center text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  <Book className="w-3 h-3 mr-1" />
                  {lecture.department || 'Department N/A'}
                </Badge>
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  Year: {lecture.year || 'N/A'}, Sem: {lecture.semester || 'N/A'}
                </Badge>
              </motion.div>
              <div className="relative">
                <svg className="w-full h-16" viewBox="0 0 400 80">
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 40 Q200 20 380 40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M20 40 Q200 20 380 40"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.circle 
                    cx="20" 
                    cy="40" 
                    r="8" 
                    fill="#3b82f6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 15 }}
                  />
                  <motion.circle 
                    cx="380" 
                    cy="40" 
                    r="8" 
                    fill="#8b5cf6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 500, damping: 15 }}
                  />
                </svg>
                <div className="absolute top-0 left-0 flex justify-between w-full px-2 pt-1">
                  <motion.div 
                    className="text-xs font-medium bg-primary text-primary-foreground px-2 py-1 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {formatTime(lecture.startFrom)}
                  </motion.div>
                  <motion.div 
                    className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 }}
                  >
                    {formatTime(lecture.till)}
                  </motion.div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Calendar, text: formatDate(lecture.startFrom) },
                  { icon: Clock, text: `${formatTime(lecture.startFrom)} - ${formatTime(lecture.till)}` },
                  { icon: MapPin, text: `Room ${lecture.roomNumber || 'N/A'}` },
                  { icon: User, text: `Faculty ID: ${lecture.facultyId || 'N/A'}` },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center space-x-1 bg-muted p-2 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * idx + 1 }}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="text-center text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <Zap className="w-3 h-3 inline-block mr-1 text-yellow-500" />
                {new Date(lecture.startFrom) > currentTime 
                  ? `Starts in ${formatTimeDifference(new Date(lecture.startFrom) - currentTime)}`
                  : new Date(lecture.till) > currentTime
                    ? "Ongoing"
                    : "Passed"}
              </motion.div>
            </CardContent>
          </Card>
        ))}
      </div>
      <motion.div 
        className="text-center text-sm text-muted-foreground mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Zap className="w-4 h-4 inline-block mr-1 text-yellow-500" />
        {getNextLectureInfo()}
      </motion.div>
    </div>
  )
}