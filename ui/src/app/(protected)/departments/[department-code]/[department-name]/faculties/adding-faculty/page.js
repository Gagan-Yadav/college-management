'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Briefcase, Phone, Mail, DollarSign, Users, Building, BookOpen, ArrowRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { toast } from "react-hot-toast"
import { useRouter, usePathname } from 'next/navigation'
import { MdOutlineQueuePlayNext } from 'react-icons/md'
import { IoMdAddCircle } from 'react-icons/io'
import axios from 'axios'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  salary: z.number().min(0, { message: "Salary must be a positive number." }),
  designation: z.string().min(2, { message: "Designation must be at least 2 characters." }),
  gender: z.enum(["Male", "Female", "Other"]),
  departmentType: z.string().min(2, { message: "Department type must be at least 2 characters." }),
  subDepartment: z.string().min(2, { message: "Sub-department must be at least 2 characters." }),
  branchCode: z.string().min(2, { message: "Please select a branch." }),
  image: z.instanceof(File).optional(),
})

export default function AddFacultyPage() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [activeTab, setActiveTab] = useState("personal")
  const pathname = usePathname()
  const paths = pathname.split("/").splice(1)
  const departmentCode = paths[1]
  const departmentName = paths[2]

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      salary: 0,
      designation: "",
      gender: "Male",
      departmentType: "",
      subDepartment: departmentName.replace(/%20/g, " "),
      branchCode: departmentCode
    },
  })

  useEffect(() => {
    form.setValue('subDepartment', departmentName.replace(/%20/g, " "))
    form.setValue('branchCode', departmentCode)
  }, [departmentName, departmentCode, form])

  async function onSubmit(values) {
    console.log(values)
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('mobile', values.mobile)
      formData.append('salary', values.salary.toString())
      formData.append('designation', values.designation)
      formData.append('departmentType', values.departmentType)
      formData.append('subDepartment', values.subDepartment)
      formData.append('branch.branchCode', values.branchCode)
      formData.append('gender', values.gender.toLowerCase())
      if (values.image) {
        formData.append('image', values.image)
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/faculty/add-faculty`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
      setIsSuccess(true)
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer)
            router.push(`/departments/${departmentCode}/${departmentName.replace(/\s+/g, '-')}/faculties`)
            return 0
          }
          return prevCount - 1
        })
      }, 1000)
    } catch (error) {
      toast.error("An error occurred while adding the faculty member.")
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      form.setValue('image', file)
    }
  }

  const handleNext = () => {
    if (activeTab === "personal") {
      setActiveTab("professional")
    } else if (activeTab === "professional") {
      setActiveTab("department")
    }
  }

  const handlePrevious = () => {
    if (activeTab === "professional") {
      setActiveTab("personal")
    } else if (activeTab === "department") {
      setActiveTab("professional")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <Card className="w-full mx-auto  h-[85vh]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-600">
            Adding New Faculty to
            <span className="font-extrabold text-black">{` ${departmentCode} - ${departmentName.replaceAll("%20", " ").trim().toUpperCase()} `}</span>
            Department...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="professional">Professional Info</TabsTrigger>
                  <TabsTrigger value="department">Department Info</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-4">
                  <div className="flex justify-center mb-6 mt-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={imagePreview || ""} alt="Preview" />
                      <AvatarFallback>{form.watch('name').charAt(0) || <User size={32} />}</AvatarFallback>
                    </Avatar>
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Faculty name here..." {...field} className="pl-10" />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender here..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="absolute bottom-2 right-2">
                    <Button type="button" onClick={handleNext}>
                      <span className='text-sm'>Next</span>
                      <MdOutlineQueuePlayNext className='w-4 h-4' />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="professional" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Designation here..." {...field} className="pl-10" />
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Mobile number here..." {...field} className="pl-10" />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Email here..." {...field} className="pl-10" />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value || 0}
                            onChange={(e) => {
                              const value = e.target.value ? Number(e.target.value) : 0
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="absolute bottom-2 right-2 space-x-2">
                    <Button type="button" onClick={handlePrevious}>
                      <span className='text-sm'>Previous</span>
                      <MdOutlineQueuePlayNext className='w-4 h-4' />
                    </Button>
                    <Button type="button" onClick={handleNext}>
                      <span className='text-sm'>Next</span>
                      <MdOutlineQueuePlayNext className='w-4 h-4' />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="department" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="departmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department Type</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="Department type here..." {...field} className="pl-10" />
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subDepartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub-Department</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} placeholder="Sub-department here..." className="pl-10" disabled />
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    
                    name="branchCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select branch here..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CS101">CS101</SelectItem>
                            <SelectItem value="CS102">CS102</SelectItem>
                            <SelectItem value="EE101">EE101</SelectItem>
                            <SelectItem value="ME101">ME101</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="absolute bottom-2 right-2 space-x-2">
                    <Button type="button" onClick={handlePrevious}>
                      <span className='text-sm'>Previous</span>
                      <MdOutlineQueuePlayNext className='w-4 h-4' />
                    </Button>
                    <Button type="submit">
                      <span className='text-sm'>Add Faculty</span>
                      <IoMdAddCircle className='w-4 h-4' />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
        <DialogContent className="sm:max-w-[450px] text-center h-[250px] space-y-4">
          <div className='flex items-center justify-center'>
            <DialogHeader>
              <div className="flex items-center justify-center">
                <span className="text-6xl animate-bounce">🎊</span>
              </div>
              <DialogTitle>
                <div className='text-center'>
                  Faculty Added Successfully!
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className='text-slate-500 text-center'>
                  You are going to redirect to next page <br />
                  <span className='text-blue-600 font-bold text-lg'>{countdown}</span> seconds
                </div>
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}