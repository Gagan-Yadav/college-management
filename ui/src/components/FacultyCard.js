'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { FaUserTie, FaEnvelope, FaPhone, FaMoneyBillWave, FaVenusMars, FaUniversity, FaCode, FaChalkboardTeacher } from 'react-icons/fa'
import { Star } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function FacultyCard({ faculty }) {
  const [rating, setRating] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const paths = pathname.split("/").splice(1)
  const departmentCode = paths[1]
  const departmentName = paths[2]


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cursor-pointer"
      onClick={() => router.push(`/departments/${departmentCode}/${departmentName}/faculties/${faculty.facultyId}`)}
    >
      <Card className="w-full max-w-md mx-auto rounded-lg">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-lg">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={faculty.imageUrl}
                alt={`${faculty.name}'s Profile`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <span>{faculty.name}</span>
          </div>
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