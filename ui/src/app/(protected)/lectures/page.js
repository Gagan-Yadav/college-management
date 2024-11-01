'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Calendar, Tag, Plus, Search, Book, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

export default function LectureManagement() {
    const [lectures, setLectures] = useState([])
    const [filteredLectures, setFilteredLectures] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSemester, setSelectedSemester] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [facultyName, setFacultyName] = useState('')
    const [activeTab, setActiveTab] = useState('all')
    const [appliedFilters, setAppliedFilters] = useState(0)

    const lecturesPerPage = 10

    useEffect(() => {
        fetchLectures()
    }, [])

    const fetchLectures = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/lectures/get-all-lectures`, { withCredentials: true })
            const lecturesWithFaculty = await Promise.all(response.data.map(async (lecture) => {
                const facultyResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faculty/faculty-by-id/${lecture.facultyId}`, { withCredentials: true })
                return { ...lecture, faculty: facultyResponse.data }
            }))
            const sortedLectures = lecturesWithFaculty.sort((a, b) => new Date(b.startFrom) - new Date(a.startFrom))
            setLectures(sortedLectures)
            setFilteredLectures(sortedLectures)
        } catch (error) {
            console.error('Error fetching lectures:', error)
        }
    }

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const filterLectures = () => {
        const now = new Date()
        let filtered = lectures.filter(lecture =>
            lecture.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedSemester === '' || lecture.semester.toString() === selectedSemester) &&
            (startDate === '' || new Date(lecture.startFrom) >= new Date(startDate)) &&
            (endDate === '' || new Date(lecture.till) <= new Date(endDate)) &&
            (facultyName === '' || lecture.faculty.name.toLowerCase().includes(facultyName.toLowerCase()))
        )

        if (activeTab === 'past') {
            filtered = filtered.filter(lecture => new Date(lecture.till) < now)
        } else if (activeTab === 'present') {
            filtered = filtered.filter(lecture =>
                new Date(lecture.startFrom) <= now && new Date(lecture.till) >= now
            )
        } else if (activeTab === 'future') {
            filtered = filtered.filter(lecture => new Date(lecture.startFrom) > now)
        }

        return filtered
    }

    useEffect(() => {
        const filtered = filterLectures()
        setFilteredLectures(filtered)
        setCurrentPage(1)

        let filterCount = 0
        if (searchTerm) filterCount++
        if (selectedSemester) filterCount++
        if (startDate) filterCount++
        if (endDate) filterCount++
        if (facultyName) filterCount++
        if (activeTab !== 'all') filterCount++
        setAppliedFilters(filterCount)
    }, [searchTerm, selectedSemester, startDate, endDate, facultyName, activeTab, lectures])

    const clearFilters = () => {
        setSearchTerm('')
        setSelectedSemester('')
        setStartDate('')
        setEndDate('')
        setFacultyName('')
        setActiveTab('all')
    }

    const indexOfLastLecture = currentPage * lecturesPerPage
    const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage
    const currentLectures = filteredLectures.slice(indexOfFirstLecture, indexOfLastLecture)
    const totalPages = Math.ceil(filteredLectures.length / lecturesPerPage)

    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        return (
            <div className='flex items-center justify-between bg-white p-2  rounded-sm'>
                <div>
                    <p className="text-sm text-muted-foreground">
                        Showing {currentLectures.length} of {filteredLectures.length} lecture{filteredLectures.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <div className="flex items-center justify-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="z-10">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white p-2 rounded-sm mb-4 ">
                <h1 className="text-xl font-bold">Lecture Management</h1>
            </div>

            <div className="space-y-4 h-[600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                   <Card className="shadow-none border-none">
                   <Input
                        type="text"
                        placeholder="Search by subject"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                   </Card>
                   <Card className="shadow-none border-none">
                   <Select
                        value={selectedSemester}
                        onValueChange={setSelectedSemester}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Semesters</SelectItem>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <SelectItem key={sem} value={sem.toString()}>{`Semester ${sem}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                   </Card>
                   <Card className="shadow-none border-none">
                    <Input
                        type="date"
                        placeholder="Start date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full"
                    />
                   </Card>
                   <Card className="shadow-none border-none">
                    <Input
                        type="date"
                        placeholder="End date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full"
                    />
                   </Card>
                   <Card className="shadow-none border-none">
                     <Input
                       type="text"
                       placeholder="Search by faculty name"
                       value={facultyName}
                       onChange={(e) => setFacultyName(e.target.value)}
                       className="w-full"
                     />
                   </Card>
                   <Card className="shadow-none border-none">
                        <div className="relative">
                        <Button
                            onClick={clearFilters}
                            variant="outline"
                            className="w-full"
                        >
                            Clear Filters
                        </Button>
                        {appliedFilters > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {appliedFilters}
                            </span>
                        )}
                        </div>
                    </Card>
                    <Card className="shadow-none border-none">
                        <Link href="/create-lecture" passHref>
                            <Button className="w-full text-sm" variant="outline">
                                <Plus className="w-4 h-4" /> Create Lecture
                            </Button>
                        </Link>
                    </Card>
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                   <TabsList className="grid w-full grid-cols-4 mb-4">
                        <TabsTrigger value="all" className={`${activeTab === 'all' ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white' : ''}`}>All Lectures</TabsTrigger>
                        <TabsTrigger value="past" className={`${activeTab === 'past' ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white' : ''}`}>Past</TabsTrigger>
                        <TabsTrigger value="present" className={`${activeTab === 'present' ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white' : ''}`}>Present</TabsTrigger>
                        <TabsTrigger value="future" className={`${activeTab === 'future' ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white' : ''}`}>Future</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-4 h-[450px] overflow-y-scroll">
                        {currentLectures.map((lecture) => (
                            <motion.div
                                key={lecture.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between relative overflow-hidden hover:shadow-lg shadow-none border-none"
                            >
                                <div className="flex items-center gap-4 flex-grow">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={lecture.faculty.imageUrl} alt={lecture.faculty.name} />
                                        <AvatarFallback>{getInitials(lecture.faculty.name)}</AvatarFallback>
                                    </Avatar>

                                    <div className="flex-grow">
                                        <h2 className="text-md font-semibold">{lecture.subject}</h2>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(lecture.startFrom), 'dd MMM, yyyy, h:mm a')}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Tag className="w-4 h-4" />
                                                 by {lecture.faculty.name}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {/* <Badge variant="secondary" className="hidden sm:inline-flex">
                                            {lecture.department}
                                        </Badge> */}
                                        <Badge variant="" className="hidden sm:inline-flex">
                                            Offline Class
                                        </Badge>
                                        <Link href={`/lecture/${lecture.lectureId}`} passHref>
                                            <Button className="bg-gradient-to-br from-purple-500 to-blue-600 text-xs">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}