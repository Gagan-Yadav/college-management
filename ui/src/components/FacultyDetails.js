import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function FacultyDetails({ facultyDetails }) {
  return (
    <>
      <div className="flex items-center space-x-6">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
          <AvatarImage src={facultyDetails?.imageUrl} alt={facultyDetails.name} />
          <AvatarFallback>{facultyDetails.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{facultyDetails.name}</h2>
          <p className="text-gray-600 text-md">{facultyDetails.designation}</p>
        </div>
      </div>
      <div className="space-y-3 text-md">
        <p><strong className="text-md">Email:</strong> {facultyDetails.email}</p>
        <p><strong className="text-md">Mobile:</strong> {facultyDetails.mobile}</p>
        <p><strong className="text-md">Department:</strong> {facultyDetails.subDepartment}</p>
        <p><strong className="text-md">Branch Code:</strong> {facultyDetails.branchCode}</p>
        <p><strong className="text-md">Gender:</strong> {facultyDetails.gender}</p>
        <p><strong className="text-md">Salary:</strong> {facultyDetails.salary}</p>
      </div>
    </>
  )
}