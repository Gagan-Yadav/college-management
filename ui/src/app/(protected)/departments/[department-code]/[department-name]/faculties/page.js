'use client'
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import FacultyList from "@/components/FacultyList"
export default function DepartmentPage() {
    const pathname = usePathname()  
    const paths = pathname.split("/").splice(1)
    const department = paths[1]
    const [departmentDetails, setDepartmentDetails] = useState(null)

    async function getFaculties() {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/branch/get-branch-by-code/${department}`,{
            withCredentials: true
        })
        console.log("response faculties", response.data)
        setDepartmentDetails(response.data)
    }

    useEffect(() => {
        getFaculties()
        console.log("departmentDetails", departmentDetails)
    }, [])

    return <FacultyList details={departmentDetails} />
}