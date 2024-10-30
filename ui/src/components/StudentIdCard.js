'use client'

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { QrCode, Printer, Mail, GraduationCap, User, MapPin, Phone, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export default function StudentIdCard({ studentDetails }) {
  const printRef = useRef(null)

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    
    printWindow.document.write('<html><head><title>Student ID Card</title>');
  
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      printWindow.document.write(link.outerHTML);
    });
  
    printWindow.document.write('</head><body>');
    
    if (printRef.current) {
      const clonedContent = printRef.current.cloneNode(true);
      printWindow.document.body.appendChild(clonedContent);
    }
  
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
        <div className="w-[400px] mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Student ID</h2>
              <div className="bg-white text-red-500 px-3 py-1 rounded-full text-sm font-semibold">
                {studentDetails.rollNo}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-pink-100 shadow-md">
                  <img 
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${studentDetails.studentName}`} 
                    alt={studentDetails.studentName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  {studentDetails.studentName}
                </h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <Mail className="w-4 h-4 mr-2 text-pink-500" />
                  {studentDetails.email}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                <User className="w-4 h-4 mr-2 text-red-400" />
                <span className="font-medium mr-1">ID:</span>
                <span>{studentDetails.studentId}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                <GraduationCap className="w-4 h-4 mr-2 text-pink-400" />
                <span className="font-medium mr-1">Branch:</span>
                <span>{studentDetails.branchCode}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                <User className="w-4 h-4 mr-2 text-red-400" />
                <span className="font-medium mr-1">Year:</span>
                <span>{studentDetails.year}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                <BookOpen className="w-4 h-4 mr-2 text-pink-400" />
                <span className="font-medium mr-1">Semester:</span>
                <span>{studentDetails.semester}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                <Phone className="w-4 h-4 mr-2 text-red-400" />
                <span className="font-medium mr-1">Mobile:</span>
                <span>{studentDetails.mobile}</span>
              </div>
              <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-md">
                <User className="w-4 h-4 mr-2 text-pink-400" />
                <span className="font-medium mr-1">Age:</span>
                <span>{studentDetails.age}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-start text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="font-medium mr-1">Address:</span>
                  <span className="text-sm">{studentDetails.address}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <QrCode className="w-24 h-24 text-red-400" />
              <p className="text-sm text-gray-500 mt-2">Scan the QR and verify</p>
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
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg px-6 py-2 rounded-full"
        >
          <Printer className="mr-2 h-5 w-5" /> Print ID Card
        </Button>
      </motion.div>
    </div>
  )
}