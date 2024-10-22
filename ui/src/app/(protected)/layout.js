'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {  ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
import Sidebar from '@/components/Layouts/Sidebar.js'
import TopNavBar from '@/components/Layouts/TopNavbar'

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'ml-60' : 'ml-20'}`}>
        <TopNavBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
        <motion.button
          className="fixed left-[210px] top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 rounded-full p-1.5 shadow-md z-50"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ left: isOpen ? '210px' : '50px' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {isOpen ? (
            <ArrowLeftToLine
              size={20}
              className="transition-transform duration-300"
            />
          ) : (
            <ArrowRightToLine
              size={20}
              className="transition-transform duration-300"
            />
          )}
        </motion.button>
      </div>
    </div>
  )
}
