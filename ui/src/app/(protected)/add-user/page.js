'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'react-hot-toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserPlus, Mail, Phone, MapPin, Key, User, Users, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import axios from 'axios'
const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  roles: z.enum(["ADMIN", "STUDENT", "FACULTY"]),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
})

export default function UserManagement() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      roles: "STUDENT",
      email: "",
      phone: "",
      city: "",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/admin/register-user`,values)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/add-user`,values,{
        withCredentials:true
      })
    
      console.log("response",response)
      toast.success("User added successfully 🎉")
      form.reset()
      setUsers(prevUsers => [...prevUsers, { ...values, id: Date.now() }])
    } catch (error) {
      toast.error("Failed to add user. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function getUsers() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-all-users-on-this-website`,{
        withCredentials:true
      })
      setUsers(response.data)
        } catch (error) {
      console.error("Error while fetching users:", error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col lg:flex-row  gap-4">
      <div className="w-full lg:w-1/2 lg:max-w-md">
        <Card className="w-full  shadow-md overflow-hidden">
          <CardHeader className="bg-gray-50 p-4">
            <CardTitle className="text-xl font-bold text-gray-800">Add New User</CardTitle>
            <CardDescription className="text-gray-600">
              Enter the details of the new user below
            </CardDescription>
          </CardHeader>
          <ScrollArea className="">
            <CardContent className="p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="enter username" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input type="password" placeholder="enter password" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="FACULTY">Faculty</SelectItem>
                          </SelectContent>
                        </Select>
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
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input type="email" placeholder="enter email" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input type="tel" placeholder="enter phone" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <div className="relative ">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="enter city" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 text-white" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <UserPlus className="mr-2 h-4 w-4 animate-spin" />
                        Adding User...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add User
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
      <div className="w-full lg:w-2/3 overflow-y-auto h-[calc(100vh-7.3rem)] rounded-lg">
        <Card className="w-full  shadow-md">
          <CardHeader className="bg-gray-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="h-5 w-5" />
                All Users
              </CardTitle>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                Total Users : {users.length}
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="">
              <div className="p-4 grid gap-2">
                {filteredUsers.map((user,index) => (
                  <Card key={index} className="hover:bg-gray-50 transition-colors">
                    <CardContent className="p-3 flex items-center space-x-4">
                      <Avatar className="h-8 w-8 ring-2 ring-primary font-semibold text-gray-500">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback>
                          {user.username ? user.username.charAt(0).toUpperCase() : ""}
                        </AvatarFallback>

                      </Avatar>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.city}</p>
                      </div>
                      <Badge
                        variant={user.roles === 'ADMIN' ? 'destructive' : user.roles === 'FACULTY' ? 'default' : 'secondary'}
                        className="ml-auto px-4 py-1 text-xs"
                      >
                        {user.roles}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}