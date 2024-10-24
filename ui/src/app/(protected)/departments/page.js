'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaCode, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import axios from 'axios'

export default function AllDepartments() {
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/branch/get-all-branches`,{
            withCredentials: true
        })
            .then(res => setDepartments(res.data))
            .catch(err => console.log("Error in fetching departments", err))
    }, [])

    return (
        <div className="min-h-screen p-2 bg-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl font-bold text-center mb-8 text-purple-800"
      >
        Explore Every Department in Our College for a Diverse Learning Experience
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.branchCode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="overflow-hidden h-full">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500">
                <CardTitle className="text-white">{dept.branchName}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div layout>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <FaCode className="text-purple-600 mr-2" />
                      <span className="font-semibold">Branch Code:</span>
                    </div>
                    <span>{dept.branchCode}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <FaUserTie className="text-green-600 mr-2" />
                      <span className="font-semibold">HOD:</span>
                    </div>
                    <span>{dept.hodName}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <FaChalkboardTeacher className="text-blue-600 mr-2" />
                      <span className="font-semibold">Faculty Count:</span>
                    </div>
                    <span>{dept.faculties.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaUserGraduate className="text-orange-600 mr-2" />
                      <span className="font-semibold">Student Count:</span>
                    </div>
                    <span>{dept.students.length}</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: departments.length * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Link href="/departments/add-department" passHref>
            <Card className="overflow-hidden h-full cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                <FaPlus className="text-purple-600 text-4xl mb-4" />
                <CardTitle className="text-center text-purple-800">Add New Department</CardTitle>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}