'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import FacultyCard from './FacultyCard'
import { Users, GraduationCap, Code, User, Calendar } from 'lucide-react'
import { FaPlusSquare } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function FacultyList({ details }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState('all')
  const [departmentData, setDepartmentData] = useState(null)
  const router = useRouter()
  const filteredFaculties = details?.faculties?.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genderFilter === 'all' || faculty.gender.toLowerCase() === genderFilter)
  )

  useEffect(() => {
    setDepartmentData(details)
  }, [details])

  return (<> 
      <div className="container mx-auto">
        <section className="text-center py-4 mb-2 bg-blue-500 text-white rounded-t-lg shadow-xl">
          <h1 className="text-xl font-bold ">{details?.branchName} Department</h1>
          <p className="text-sm ">Branch Code: {details?.branchCode}</p>
          <p className="text-md font-semibold">Head of Department: {details?.hodName}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <Card className="bg-blue-500 text-white rounded-bl-lg rounded-br-none rounded-tl-none rounded-tr-none">
            <CardContent className="flex items-center justify-between p-3">
              <div>
                <p className="text-md font-semibold">Total Faculty</p>
                <p className="text-sm font-bold">{(details?.faculties?.length) < 9 ? `0${details?.faculties?.length}` : details?.faculties?.length}</p>
              </div>
              <Users size={28} />
            </CardContent>
          </Card>
          <Card className="bg-blue-500 text-white rounded-none">
            <CardContent className="flex items-center justify-between p-3">
              <div>
                <p className="text-md font-semibold">Total Subjects</p>
                <p className="text-sm font-bold">{(details?.subjects?.length) < 9 ? `0${details?.subjects?.length}` : details?.subjects?.length}</p>
              </div>  
              <GraduationCap size={28} />
            </CardContent>
          </Card>
          <Card className="bg-blue-500 text-white rounded-bl-none rounded-br-lg rounded-tl-none rounded-tr-none">
            <CardContent className="flex items-center justify-between p-3">
              <div>
                <p className="text-lg font-semibold">Department Announcements</p>
                <p className="text-sm font-light">Stay updated with the latest information</p>
              </div>
              <Calendar size={28} />
            </CardContent>
          </Card>

        </div>

        <Card className="mb-4 ">
          <CardContent className="p-4">
            {/* <h2 className="text-2xl font-bold mb-4">Search and Filter</h2> */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Search faculty by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            
                <Card className="bg-blue-500 text-white">
                  <CardContent className="flex items-center justify-center p-2 cursor-pointer">
                    <div className="flex items-center gap-2" onClick={() => router.push(`/departments/${details?.branchCode}/${details?.branchName}/faculties/adding-faculty`)}>
                    <FaPlusSquare size={20}/>
                    <p className="text-sm">Add Faculty</p>
                    </div>
                    </CardContent>
                </Card>
             
            </div>
          </CardContent>
        </Card>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <AnimatePresence>
            {filteredFaculties?.map((faculty) => (
              <motion.div
                key={faculty.facultyId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FacultyCard faculty={faculty} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredFaculties?.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-xl">No faculties found matching your search criteria.</p>
        )}
      </div>
    </>
  )
}