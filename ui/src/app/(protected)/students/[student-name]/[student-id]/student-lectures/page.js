'use client'
import StudentLectures from "@/components/StudentLectures";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function StudentLecturesPage() {
    const pathname = usePathname()
    const studentId = pathname.split("/")[3]
    const [studentLectures, setStudentLectures] = useState([])

    async function getStudentDetailsById() {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/get-student/${studentId}`, {
            withCredentials: true
          })
          setStudentLectures(response.data.lectures)
          console.log("student lectures", response.data.lectures)
        } catch (error) {
          console.error("Error fetching student details:", error)
          toast("Error fetching student details")
        }
      }

      useEffect(() => {
        getStudentDetailsById()
      }, [])
  return <StudentLectures lectures={studentLectures} />
}
