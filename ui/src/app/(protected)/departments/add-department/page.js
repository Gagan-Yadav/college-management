'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { Plus, X, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GiCancer } from 'react-icons/gi'
import axios from 'axios'
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AddDepartment() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      branchCode: '',
      branchName: '',
      hodName: '',
      subjects: [{ name: '' }] 
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects'
  })

  const onSubmit = async (data) => {
    const formattedData = {
      branchCode: data.branchCode,
      branchName: data.branchName,
      hodName: data.hodName,
      subjects: data.subjects.map(subject => subject.name) 
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/branch/add-branch`, formattedData, {
        withCredentials: true
      })
      if (response.status === 200) {
        setIsSuccess(true)
      }
    } catch (error) {
      toast.error("Department establishment failed")
    }
  }

  useEffect(() => {
    let timer
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (isSuccess && countdown === 0) {
      router.push('/departments')
    }
    return () => clearTimeout(timer)
  }, [isSuccess, countdown, router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-100 "
    >
      <Card className="w-full bg-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-800">
            Add New Department
          </CardTitle>
          <p className="text-center text-slate-500 text-sm">Create a new academic department for your institution</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="branchCode" className="text-sm font-medium text-slate-700">Department Code</Label>
              <Input
                id="branchCode"
                {...register("branchCode", { 
                  required: "Department code is required",
                  pattern: {
                    value: /^[A-Z0-9]+$/,
                    message: "Department code should start with uppercase letters and numbers only"
                  }
                })}
                className="mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new department code"
              />
              {errors.branchCode && <p className="mt-1 text-sm text-red-600">{errors.branchCode.message}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="branchName" className="text-sm font-medium text-slate-700">Department Name</Label>
              <Input
                id="branchName"
                {...register("branchName", { required: "Department name is required" })}
                className="mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new department name"
              />
              {errors.branchName && <p className="mt-1 text-sm text-red-600">{errors.branchName.message}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="hodName" className="text-sm font-medium text-slate-700">Department HOD Name</Label>
              <Input
                id="hodName"
                {...register("hodName", { required: "Department HOD name is required" })}
                className="mt-1 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new department HOD name"
              />
              {errors.hodName && <p className="mt-1 text-sm text-red-600">{errors.hodName.message}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-slate-700">Department Subjects</Label>
              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center mt-2"
                  >
                    <Input
                      {...register(`subjects.${index}.name`, { required: "Subject name is required" })}
                      className="flex-grow focus:ring-2 focus:ring-blue-500"
                      placeholder={`Subject ${index + 1} here...`}
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="ghost"
                      size="icon"
                      className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {errors.subjects && <p className="mt-1 text-sm text-red-600">At least one subject is required</p>}
              <Button
                type="button"
                onClick={() => append({ name: '' })}
                variant="outline"
                className="mt-2 w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" /> Add More Subject
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between pt-4 space-x-2"
            >
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-md text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                <span className='text-sm'>Establish Department</span>
              </Button>

              <Button
                type="button"
                onClick={() => router.push('/departments')}
                className="w-full bg-red-600 text-white px-8 py-3 rounded-md text-lg shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <GiCancer className="h-5 w-5 mr-2" />
                <span className='text-sm'>Cancel Establishment</span>
              </Button>
            </motion.div>
          </form>
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
                <div className='text-center '>
                Department Established Successfully! 
                </div>
            </DialogTitle>
            <DialogDescription>
              <div className='text-slate-500 text-center'>
                You are goging to redirect to departments view <br /> 
                <span className='text-blue-600 font-bold text-lg'>{countdown}</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}