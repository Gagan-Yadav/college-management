import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function AssignLecture({ facultyDetails }) {
  const [year, setYear] = useState("1")
  const [semester, setSemester] = useState("1")
  const [department, setDepartment] = useState("Computer Science")
  const [subject, setSubject] = useState("Data Structures")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('10:30')
  const [roomNumber, setRoomNumber] = useState(0)
  const [studentIds, setStudentIds] = useState("")

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear)
    setSemester(selectedYear === "1" ? "1" : (parseInt(selectedYear) * 2 - 1).toString())
  }

  const getSemesterOptions = () => {
    const yearNumber = parseInt(year)
    return [
      { value: (yearNumber * 2 - 1).toString(), label: (yearNumber * 2 - 1).toString() },
      { value: (yearNumber * 2).toString(), label: (yearNumber * 2).toString() }
    ]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates")
      return
    }

    const startDateTime = new Date(startDate)
    startDateTime.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]))

    const endDateTime = new Date(endDate)
    endDateTime.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]))

    const lectureData = {
      year: parseInt(year),
      semester: parseInt(semester),
      department,
      subject,
      startFrom: startDateTime.toISOString(),
      till: endDateTime.toISOString(),
      roomNumber,
      facultyId: facultyDetails.facultyId,
    //   studentIds: studentIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    }

    try {
     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/lectures/create-lecture`, lectureData, 
        { 
            withCredentials: true
         })
      if (response.data) {
        toast.success("Lecture assigned successfully")
      } else {
        toast.error("Failed to assign lecture")
      }
    } catch (error) {
      toast.error("An error occurred while assigning the lecture")
    }
  }

  const TimeSelect = ({ value, onChange }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 24 * 4 }).map((_, index) => {
          const hours = Math.floor(index / 4)
          const minutes = (index % 4) * 15
          const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
          return <SelectItem key={time} value={time}>{time}</SelectItem>
        })}
      </SelectContent>
    </Select>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="facultyId">Faculty Name</Label>
        <Input 
          id="facultyName" 
          name="facultyName" 
          value={facultyDetails.name} 
          disabled 
          className="w-full" 
        />
      </div>
         <div className="space-y-2">
        <Label htmlFor="facultyId">Faculty ID</Label>
        <Input 
          id="facultyId" 
          name="facultyId" 
          value={facultyDetails.facultyId} 
          disabled 
          className="w-full" 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Select value={year} onValueChange={handleYearChange}>
          <SelectTrigger id="year" className="w-full">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1st Year</SelectItem>
            <SelectItem value="2">2nd Year</SelectItem>
            <SelectItem value="3">3rd Year</SelectItem>
            <SelectItem value="4">4th Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="semester">Semester</Label>
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger id="semester" className="w-full">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            {getSemesterOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Input 
          id="department" 
          name="department" 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
          className="w-full" 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subDepartment">Sub Department</Label>
        <Input 
          id="subDepartment" 
          name="subDepartment" 
          value={facultyDetails.subDepartment} 
          disabled 
          className="w-full" 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input 
          id="subject" 
          name="subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          className="w-full" 
        />
      </div>
      <div className="space-y-2">
        <Label>Start From</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <TimeSelect value={startTime} onChange={setStartTime} />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Till</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <TimeSelect value={endTime} onChange={setEndTime} />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="roomNumber">Room Number</Label>
        <Input 
          id="roomNumber" 
          name="roomNumber" 
          type="number" 
          value={roomNumber} 
          onChange={(e) => setRoomNumber(parseInt(e.target.value))} 
          className="w-full" 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="studentIds">Student IDs</Label>
        <Input 
          id="studentIds" 
          name="studentIds" 
          value={studentIds}
          onChange={(e) => setStudentIds(e.target.value)}
          placeholder="Enter comma-separated student IDs" 
          className="w-full" 
        />
      </div>
      <Button type="submit" className="w-full mt-4">Assign Lecture</Button>
    </form>
  )
}