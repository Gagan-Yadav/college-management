'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { UserPlus, Mail, Phone, MapPin, Key, User } from 'lucide-react'

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  roles: z.enum(["ADMIN", "STUDENT", "FACULTY"]),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
})

export default function AddUserPage() {
  const [isLoading, setIsLoading] = useState(false)

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
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/add-user`, values, { withCredentials: true,headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      } })
      console.log(response)
      toast.success("User added successfully", {
        duration: 3000,
        position: 'bottom-right',
        className: 'bg-green-500 text-white',
      })
      form.reset()
    } catch (error) {
      toast.error("Failed to add user. Please try again.", {
        duration: 3000,
        position: 'bottom-right',
        className: 'bg-red-500 text-white',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-gray-50 to-gray-100 py-2 px-2 sm:px-2 lg:px-2">
      <Card className="w-full mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-primary">Add New User</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter the details of the new user below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input placeholder="johndoe" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Choose a unique username</FormDescription>
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
                          <Input type="password" placeholder="******" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Enter a strong password</FormDescription>
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
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="STUDENT">Student</SelectItem>
                          <SelectItem value="FACULTY">Faculty</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the user's role</FormDescription>
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
                          <Input type="email" placeholder="john@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Enter the user's email address</FormDescription>
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
                          <Input type="tel" placeholder="1234567890" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Enter the 10-digit phone number</FormDescription>
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
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input placeholder="New York" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Enter the user's city</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter className="flex justify-end px-0 pt-6">
                <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
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
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}