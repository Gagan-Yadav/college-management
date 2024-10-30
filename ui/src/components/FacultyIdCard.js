'use client'

import React, { useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { QrCode, Printer, Mail, Building2, User, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FacultyIdCard({ facultyDetails }) {
  const printRef = useRef(null)

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write('<html><head><title>Faculty ID Card</title>');
  
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      printWindow.document.write(link.outerHTML);
    });
  
    printWindow.document.write('</head><body>');
    
    const clonedContent = printRef.current.cloneNode(true);
    printWindow.document.body.appendChild(clonedContent);
  
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 800);
  };
  

  return (
    <div className="space-y-6">
      <div ref={printRef}>
        <div className="w-[350px] mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
         
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-bold text-white">Faculty ID Card</h2>
              <div className="bg-white text-purple-600 px-2 py-1 rounded-full text-xs font-semibold">
                ID: {facultyDetails?.facultyId}
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={facultyDetails?.imageUrl || '/placeholder.svg?height=80&width=80'} 
                    alt={facultyDetails?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-purple-600">
                  {facultyDetails?.name}
                </h3>
                <div className="flex items-center text-gray-600 text-xs">
                  <Mail className="w-3 h-3 mr-1" />
                  {facultyDetails?.email}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-700">
                <Building2 className="w-4 h-4 mr-2 text-purple-600" />
                <span className="font-medium">Department:</span>
                <span className="ml-1">{facultyDetails?.subDepartment}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                <span className="font-medium">Designation:</span>
                <span className="ml-1">{facultyDetails?.designation}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                <span className="font-medium">Branch:</span>
                <span className="ml-1">{facultyDetails?.branchCode}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                <span className="font-medium">Gender:</span>
                <span className="ml-1">{facultyDetails?.gender}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-purple-600" />
                <span className="font-medium">Mobile:</span>
                <span className="ml-1">{facultyDetails?.mobile}</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <QrCode className="w-20 h-20 text-purple-600" />
              <p className="text-xs text-gray-500">Scan QR code for digital verification</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className="flex justify-center"
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handlePrint}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
        >
          <Printer className="mr-2 h-5 w-5" /> Print ID Card
        </Button>
      </motion.div>
    </div>
  )
}