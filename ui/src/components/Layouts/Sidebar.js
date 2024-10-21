"use client"
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link  from "next/link";
import menuItems from "@/lib/menu-list"

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname()

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 w-20 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white p-3 flex flex-col items-center shadow-lg overflow-hidden"
      animate={{ width: isOpen ? '240px' : '80px' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }} 
    >
      <motion.div
        className="mt-2 mb-4 p-2 bg-white/10 rounded-2xl cursor-pointer overflow-hidden backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }} 
      >
        <motion.div
          className="h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg"
          animate={{ width: isOpen ? 'auto' : '48px' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }} 
        >
          <AnimatePresence initial={false} mode="wait">
            {isOpen ? (
              <motion.span
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }} 
                className="px-3"
              >
                AMAN YADAV
              </motion.span>
            ) : (
              <motion.span
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }} 
              >
                AY
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <div className="flex-grow w-full space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            className={`flex items-center cursor-pointer group relative rounded-lg overflow-hidden ${
              pathname === item.href ? 'bg-white/20' : 'hover:bg-white/10'
            } transition-colors duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }} // Smoother hover effect
          >
            <Link href={item.href} className="flex items-center w-full p-3">
              <item.icon size={24} className="text-indigo-200 group-hover:text-white transition-colors" />
              {isOpen && (
                <motion.span
                  className="ml-4 text-sm font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }} // Smoother text slide-in/out
                >
                  {item.text}
                </motion.span>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Sidebar
