import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function EditStudent({ studentDetails, setStudentDetails }) {
  const [editedStudent, setEditedStudent] = useState(studentDetails);

  useEffect(() => {
    setEditedStudent(studentDetails);
  }, [studentDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent(prev => ({ ...prev, [name]: value }));
  }

  async function updateStudentDetails(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(editedStudent).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student/update-student/${studentDetails?.studentId}`, editedStudent, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });

      setStudentDetails(response.data);
      toast("Student details updated");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating student details:", error);
      toast("Failed to update student details");
    }
  }

  return (
    <form onSubmit={updateStudentDetails} className="space-y-4">
      {Object.entries(editedStudent).map(([key, value]) => {
        if (key === "lectures" || key === "studentId") {
          return null;
        }
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
            <Input 
              id={key} 
              name={key} 
              value={value} 
              onChange={handleInputChange} 
              className="w-full" 
            />
          </div>
        )
      })}
      <Button type="submit" className="w-full mt-4">Save Changes</Button>
    </form>
  )
}
