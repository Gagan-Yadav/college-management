
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function EditFaculty({ facultyDetails, setFacultyDetails }) {
  const [editedFaculty, setEditedFaculty] = useState(facultyDetails)
  const [imageFile, setImageFile] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedFaculty(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  async function updateFacultyDetails(e) {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(editedFaculty).forEach(([key, value]) => {
        formData.append(key, value)
      })
      if (imageFile) {
        formData.append('image', imageFile)
      }
      console.log(formData);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/faculty/update-faculty-by-id/${facultyDetails.facultyId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response.data);
      setFacultyDetails(response.data)
      toast("Faculty details updated")
      setTimeout(()=>{
        window.location.reload();
      },1000)
    } catch (error) {
      console.error("Error updating faculty details:", error)
      toast("Failed to update faculty details")
    }
  }

  useEffect(()=>{
    
  },[facultyDetails])

  return (
    <form onSubmit={updateFacultyDetails} className="space-y-4">
      {Object.entries(editedFaculty).map(([key, value]) => {
        if (key === 'imageUrl') {
          return (
            <div key={key} className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input 
                id="image" 
                name="image" 
                type="file" 
                onChange={handleImageChange} 
                className="w-full" 
              />
            </div>
          )
        }
        if(key=="lectureIds" || key=="lectures" || key=="facultyId"){
            return null;
        }
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
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