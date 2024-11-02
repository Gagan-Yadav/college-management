"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Edit, Mail, BookOpen, Trash2, CreditCard, ClipboardList } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TbClick } from "react-icons/tb"
import StudentDetails from '@/components/StudentDetails'
import EmailSendStudent from '@/components/EmailSendStudent'
// import StudentLectures from '@/components/StudentLectures'
import StudentIdCard from '@/components/StudentIdCard'
// import StudentAttendance from '@/components/StudentAttendance'
import { usePathname } from 'next/navigation'
import EditStudent from '@/components/EditStudent'


export default function StudentManagement() {
  const [studentDetails, setStudentDetails] = useState({})
  const [activeSection, setActiveSection] = useState('details')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isIdCardDialogOpen, setIsIdCardDialogOpen] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const studentId = useParams()['student-id']
  const router = useRouter()
  const paths = usePathname().split("/")
  const departmentCode = paths[3]
  const departmentName = paths[4]

  useEffect(() => {
    getStudentDetailsById()
  }, [studentId])

  useEffect(() => {
    let timer
    if (isSuccessDialogOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      router.push(`/students`) 
    }
    return () => clearTimeout(timer)
  }, [isSuccessDialogOpen, countdown, router, departmentCode, departmentName])

  async function getStudentDetailsById() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/get-student/${studentId}`, {
        withCredentials: true
      })
      setStudentDetails(response.data)
      console.log("studentDetails", response.data)
    } catch (error) {
      console.error("Error fetching student details:", error)
      toast("Error fetching student details")
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/student/delete-student/${studentId}`, {
        withCredentials: true
      })
      setIsDeleteDialogOpen(false)
      setIsSuccessDialogOpen(true)
    } catch (error) {
      toast("Error deleting student")
    }
  }

  function RenderRightSection() {
    switch (activeSection) {
      case 'edit':
        return <EditStudent studentDetails={studentDetails} setStudentDetails={setStudentDetails} />
      case 'email':
        return <EmailSendStudent studentEmail={studentDetails.email} />
      case 'attendance':
        // return <StudentAttendance studentDetails={studentDetails} />
        return <h1>Student Attendance</h1>
      default:
        return null
    }
  }

  return (
    <div className="mx-auto bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:sticky">
          <ScrollArea className="h-full">
            <Card className="overflow-hidden shadow-lg rounded-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                <CardTitle className="text-2xl font-bold">Student Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-4">
                <StudentDetails studentDetails={studentDetails} />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setActiveSection('edit')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    <Edit className="mr-2 h-5 w-5" /> Edit
                  </Button>
                  <Button onClick={() => setActiveSection('email')} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <Mail className="mr-2 h-5 w-5" /> Send Email
                  </Button>
                  <Button onClick={() => router.push(`/students/${studentDetails.studentName}/${studentDetails.studentId}/student-lectures`)} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    <BookOpen className="mr-2 h-5 w-5" /> Lectures
                  </Button>
                  <Button onClick={() => setIsIdCardDialogOpen(true)} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                    <CreditCard className="mr-2 h-5 w-5" /> ID Card
                  </Button>
                  <Button onClick={() => setActiveSection('attendance')} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <ClipboardList className="mr-2 h-5 w-5" /> Attendance
                  </Button>
                  <Button onClick={() => setIsDeleteDialogOpen(true)} variant="destructive" className="flex-1">
                    <Trash2 className="mr-2 h-5 w-5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
        <div className='h-[86vh]'>
          <Card className="col-span-1 shadow-lg h-full overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg">
              <CardTitle className="text-2xl font-bold">
                {activeSection === 'edit' ? 'Edit Student' : 
                 activeSection === 'email' ? 'Send Email' :
                 activeSection === 'attendance' ? 'Student Attendance' : 'Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[calc(100%-50px)] overflow-y-scroll">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {
                    activeSection === "details" ? 
                        <div className='flex items-center justify-center flex-col gap-2 h-[75vh]'>
                            <TbClick className='text-6xl animate-bounce text-slate-500' />
                            <span className='text-2xl font-bold text-slate-500'>Click on the buttons to perform actions</span>
                        </div> : <RenderRightSection />
                  }
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this student? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isIdCardDialogOpen} onOpenChange={setIsIdCardDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Student ID Card</DialogTitle>
            <DialogDescription>
              Preview and print the student ID card.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <StudentIdCard studentDetails={studentDetails} />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[450px] text-center h-[250px] space-y-4">
          <div className='flex items-center justify-center'>
            <DialogHeader>
              <div className="flex items-center justify-center">
                <span className="text-6xl animate-bounce">🎊</span>
              </div>
              <DialogTitle>
                <div className='text-center'>
                  Student Deleted Successfully!
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className='text-slate-500 text-center'>
                  You are going to be redirected to the next page <br /> 
                  <span className='text-blue-600 font-bold text-lg'>{countdown}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}