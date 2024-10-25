'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaUserTie, FaEnvelope, FaPhone, FaMoneyBillWave, FaVenusMars, FaUniversity, FaCode, FaChalkboardTeacher } from 'react-icons/fa'
import { Star } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Edit, Mail, BookOpen, Trash2 } from 'lucide-react'


export default function FacultyCard({ faculty }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedFaculty, setEditedFaculty] = useState(faculty)
  const [showLectures, setShowLectures] = useState(false)
  const [rating, setRating] = useState(0)

  const handleEdit = () => {
    onEdit(editedFaculty)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(faculty.id)
  }

  const handleQuickEmail = () => {
    onQuickEmail(faculty.email)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto rounded-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-lg">
          <CardTitle className="text-white flex items-center justify-between">
            <span>{faculty.name}</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <motion.div layout className="space-y-3">
            <InfoItem icon={<FaUserTie />} label="Designation" value={faculty.designation} />
            <InfoItem icon={<FaEnvelope />} label="Email" value={faculty.email} />
            <InfoItem icon={<FaPhone />} label="Mobile" value={faculty.mobile.toString()} />
            <InfoItem icon={<FaMoneyBillWave />} label="Salary" value={`${faculty.salary}`} />
            <InfoItem icon={<FaVenusMars />} label="Gender" value={faculty.gender} />
            <InfoItem icon={<FaUniversity />} label="Department" value={faculty.departmentType} />
            <InfoItem icon={<FaCode />} label="Branch Code" value={faculty.branchCode} />
            <InfoItem icon={<FaChalkboardTeacher />} label="Lectures" value={faculty.lectures} />
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
        <TooltipProvider>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setIsEditing(true)} className="hover:bg-gray-100 transition-colors duration-300 w-full">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Faculty Information</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Faculty Information</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {Object.entries(editedFaculty).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={key} className="text-right">{key}</Label>
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) => setEditedFaculty({ ...editedFaculty, [key]: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleEdit}>Save Changes</Button>
            </DialogContent>
          </Dialog>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleQuickEmail} className="hover:bg-gray-100 transition-colors duration-300 w-full">
                <Mail className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send Quick Email</p>
            </TooltipContent>
          </Tooltip>

          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setShowLectures(true)} className="hover:bg-gray-100 transition-colors duration-300 w-full">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage Lectures</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Lectures</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Current lectures: {faculty.lectures}</p>
                <Input
                  type="number"
                  value={editedFaculty.lectures}
                  onChange={(e) => setEditedFaculty({ ...editedFaculty, lectures: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>
              <Button onClick={() => {
                handleEdit();
                setShowLectures(false);
              }}>Update Lectures</Button>
            </DialogContent>
          </Dialog>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon" onClick={handleDelete} className="hover:bg-gray-100 transition-colors duration-300 w-full">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Faculty</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      </Card>
    </motion.div>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
      <span className="font-light text-sm">{label}:</span>
      <span className="text-sm">{value}</span>
    </motion.div>
  )
}