import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function StudentDetails({ studentDetails }) {
  return (
    <>
      <div className="flex items-center space-x-6">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
          <AvatarImage src={""} alt={studentDetails.studentName} />
          <AvatarFallback>{studentDetails.studentName?.charAt(0).toUpperCase()  }</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{(studentDetails.studentName)}</h2>
          <p className="text-gray-600 text-md">{studentDetails.rollNo}</p>
        </div>
      </div>
      <div className="space-y-3 text-md">
        <p><strong className="text-md">Branch:</strong> {studentDetails.rollNo}</p>
        <p><strong className="text-md">Year:</strong> {`${studentDetails.year} Year`}</p>
        <p><strong className="text-md">Semester:</strong> {`${studentDetails.semester} Semester`}</p>
        <p><strong className="text-md">Email:</strong> {studentDetails.email}</p>
        <p><strong className="text-md">Mobile:</strong> {studentDetails.mobile}</p>
        <p><strong className="text-md">Address:</strong> {studentDetails.address}</p>
        <p><strong className="text-md">Age:</strong> {studentDetails.age}</p>
      </div>
    </>
  )
}
