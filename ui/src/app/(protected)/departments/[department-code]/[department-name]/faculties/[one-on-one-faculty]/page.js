'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, BookOpen, Trash2, Edit, Send, Calendar, Bold, Heading, Type, Palette, Link as LinkIcon, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Undo, Redo } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns'
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParams } from 'next/navigation'
import axios from 'axios'
// import { useToast } from "@/components/ui/use-toast"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import toast from 'react-hot-toast'

export default function Component() {
  const [facultyDetails, setFacultyDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    subDepartment: '',
    branchCode: '',
    gender: '',
    salary: '',
    imageUrl: '',
  })
  const [activeSection, setActiveSection] = useState('details')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editedFaculty, setEditedFaculty] = useState(facultyDetails)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [emailTo, setEmailTo] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailSuggestions, setEmailSuggestions] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [attachments, setAttachments] = useState([])
  const [emailTemplates] = useState([
    { name: 'Welcome', content: '<p>Welcome to our faculty!</p>' },
    { name: 'Meeting Invitation', content: '<p>You are invited to a faculty meeting.</p>' },
  ])
  const facultyId = useParams()['one-on-one-faculty'] 
  // const { toast } = useToast()

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Write your email content here...</p>',
  })

  useEffect(() => {
    getFacultyDetailsById()
  }, [facultyId])

  useEffect(() => {
    setEditedFaculty(facultyDetails)
    setEmailTo(facultyDetails.email)
  }, [facultyDetails])

  const handleInputChange = (e) => {
    setEditedFaculty({ ...editedFaculty, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleDelete = () => {
    console.log("Faculty deleted")
    setIsDeleteDialogOpen(false)
    toast("Faculty deleted")
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmailTo(value)
    
    if (value.includes('@')) {
      const [username, domain] = value.split('@')
      if (domain) {
        setEmailSuggestions([
          `${username}@gmail.com`,
          `${username}@outlook.com`,
          `${username}@yahoo.com`,
        ])
      } else {
        setEmailSuggestions([])
      }
    } else {
      setEmailSuggestions([])
    }
  }

  const handleAttachmentChange = (e) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)])
    }
  }

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  async function getFacultyDetailsById() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faculty/faculty-by-id/${facultyId}`, {
        withCredentials: true
      })
      setFacultyDetails(response.data)
    } catch (error) {
      console.error("Error fetching faculty details:", error)
      toast("Error fetching faculty details")
    }
  }

  async function updateFacultyDetails() {
    try {
      const formData = new FormData()
      Object.entries(editedFaculty).forEach(([key, value]) => {
        formData.append(key, value)
      })
      if (imageFile) {
        formData.append('image', imageFile)
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/faculty/update-faculty-by-id/${facultyId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log("response", response)
      toast("Faculty details updated")
    } catch (error) {
      console.error("Error updating faculty details:", error)
      toast("Failed to update faculty details")
    }
  }

  const sendEmail = async () => {
    try {
      const emailContent = editor?.getHTML()
      // Here you would typically send the email using an API
      console.log("Sending email:", { to: emailTo, subject: emailSubject, content: emailContent, attachments })
      toast("Email sent")
    } catch (error) {
      console.error("Error sending email:", error)
      toast("Failed to send email")
    }
  }

  const applyTemplate = (template) => {
    editor?.commands.setContent(template.content)
  }

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const renderRightSection = () => {
    switch (activeSection) {
      case 'edit':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4">Edit Faculty</h2>
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
              return (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input 
                    id={key} 
                    name={key} 
                    value={value } 
                    onChange={handleInputChange} 
                    className="w-full" 
                  />
                </div>
              )
            })}
            <Button className="w-full mt-4" onClick={updateFacultyDetails}>Save Changes</Button>
          </motion.div>
        )
      case 'email':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4">Send Email</h2>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" value={emailTo} onChange={handleEmailChange} className="w-full" />
              {emailSuggestions.length > 0 && (
                <ul className="mt-1 bg-white border rounded-md shadow-sm">
                  {emailSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => setEmailTo(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={emailSubject} 
                onChange={(e) => setEmailSubject(e.target.value)} 
                className="w-full" 
              />
            </div>
            <div className="space-y-2">
              <Label>Email Templates</Label>
              <Select onValueChange={(value) => applyTemplate(emailTemplates.find(t => t.name === value) || emailTemplates[0])}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map((template, index) => (
                    <SelectItem key={index} value={template.name}>{template.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Email Body</Label>
              <div className="border rounded-md p-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={editor?.isActive('bold') ? 'is-active' : ''}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                  >
                    <Heading className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().setHardBreak().run()}
                  >
                    <Type className="h-4 w-4" />
                  </Button>
                  <Select onValueChange={(value) => editor?.chain().focus().setColor(value).run()}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="#000000">Black</SelectItem>
                      <SelectItem value="#0000FF">Blue</SelectItem>
                      <SelectItem value="#FF0000">Red</SelectItem>
                      <SelectItem value="#008000">Green</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={insertTable}
                  >
                    <Table className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = window.prompt('Enter the URL')
                      if (url) {
                        editor?.chain().focus().setLink({ href: url }).run()
                      }
                    }}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = window.prompt('Enter the image URL')
                      if (url) {
                        editor?.chain().focus().setImage({ src: url }).run()
                      }
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                    className={editor?.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                  >
                    <AlignLeft  className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                    className={editor?.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                    className={editor?.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={editor?.isActive('bulletList') ? 'is-active' : ''}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={editor?.isActive('orderedList') ? 'is-active' : ''}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>
                <EditorContent editor={editor} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachments</Label>
              <Input id="attachment" type="file" multiple onChange={handleAttachmentChange} className="w-full" />
              {attachments.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium">Attached Files:</h4>
                  <ul className="list-disc pl-5">
                    {attachments.map((file, index) => (
                      <li key={index} className="text-sm">
                        {file.name}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeAttachment(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button className="w-full mt-4" onClick={sendEmail}>Send Email</Button>
          </motion.div>
        )
      case 'lecture':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4">Assign Lecture</h2>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" defaultValue={2023} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select defaultValue="2">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue="Computer Science" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" defaultValue="Data Structures" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>Start From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
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
            </div>
            <div className="space-y-2">
              <Label>Till</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input id="roomNumber" type="number" defaultValue={204} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentIds">Student IDs</Label>
              <Input id="studentIds" placeholder="Enter comma-separated student IDs" className="w-full" />
            </div>
            <Button className="w-full mt-4">Assign Lecture</Button>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <ScrollArea className="h-full">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <CardTitle className="text-3xl font-bold">Faculty Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={facultyDetails.imageUrl} alt={facultyDetails.name} />
                    <AvatarFallback>{facultyDetails.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-3xl font-semibold">{facultyDetails.name}</h2>
                    <p className="text-gray-600 text-lg">{facultyDetails.designation}</p>
                  </div>
                </div>
                <div className="space-y-3 text-lg">
                  <p><strong className="font-medium">Email:</strong> {facultyDetails.email}</p>
                  <p><strong className="font-medium">Mobile:</strong> {facultyDetails.mobile}</p>
                  <p><strong className="font-medium">Department:</strong> {facultyDetails.subDepartment}</p>
                  <p><strong className="font-medium">Branch Code:</strong> {facultyDetails.branchCode}</p>
                  <p><strong className="font-medium">Gender:</strong> {facultyDetails.gender}</p>
                  <p><strong className="font-medium">Salary:</strong> {facultyDetails.salary}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setActiveSection('edit')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit className="mr-2 h-5 w-5" /> Edit
                  </Button>
                  <Button onClick={() => setActiveSection('email')} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <Mail className="mr-2 h-5 w-5" /> Send Email
                  </Button>
                  <Button onClick={() => setActiveSection('lecture')} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    <BookOpen className="mr-2 h-5 w-5" /> Assign Lecture
                  </Button>
                  <Button onClick={() => setIsDeleteDialogOpen(true)} variant="destructive" className="flex-1">
                    <Trash2 className="mr-2 h-5 w-5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
        <div>
          <Card className="col-span-1 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <CardTitle className="text-3xl font-bold">
                {activeSection === 'edit' ? 'Edit Faculty' : 
                 activeSection === 'email' ? 'Send Email' : 
                 activeSection === 'lecture' ? 'Assign Lecture' : 'Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {renderRightSection()}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this faculty member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}