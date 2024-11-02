'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Bell, Search, X, Calendar, User, Clock, Edit, Trash, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import toast from 'react-hot-toast'
export default function EnhancedAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    branchId: "",
    announcerId: "",
    expirationDate: "2024-11-20T23:59:59",
    isActive: true
  })

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    filterAnnouncements()
  }, [announcements, searchTerm, statusFilter])

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/announcements/get-all-announcement`, {
        withCredentials: true
      })
      setAnnouncements(response.data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    }
  }

  const filterAnnouncements = () => {
    let filtered = announcements.filter(announcement =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (statusFilter !== 'all') {
      filtered = filtered.filter(announcement => 
        statusFilter === 'active' ? announcement.isActive : !announcement.isActive
      )
    }

    setFilteredAnnouncements(filtered)
  }
  const handleDateChange = (e) => {
    const date = e.target.value;  
    const formattedDate = `${date}T23:59:59`;
    
    setNewAnnouncement({
      ...newAnnouncement,
      expirationDate: formattedDate  
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleCreateAnnouncement = async () => {
    console.log(newAnnouncement)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/announcements/add-announcement`, newAnnouncement, {
        withCredentials: true
      })
      toast.success('Announcement created successfully')
        fetchAnnouncements()
        setIsCreateDialogOpen(false)
        setNewAnnouncement({ title: '', description: '', branchId: '', announcerId: '', expirationDate: '',})
    } catch (error) {
      console.error('Error creating announcement:', error)
    }
  }

  const handleEditAnnouncement = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/announcements/update-announcement-by-id/${selectedAnnouncement.announcementId}`, selectedAnnouncement, {
        withCredentials: true
      }
    )
    toast.success('Announcement updated successfully')
      
        fetchAnnouncements()
        setIsEditDialogOpen(false)
      
    } catch (error) {
      console.error('Error updating announcement:', error)
    }
  }

  const handleDeleteAnnouncement = async (id) => {
    try {
     await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/announcements/delete-announcement/${id}`, {
        withCredentials: true
      })
      toast.success('Announcement deleted successfully')
      fetchAnnouncements()
        setSelectedAnnouncement(null)
      
    } catch (error) {
      console.error('Error deleting announcement:', error)
    }
  }

  return (
    <div className="">
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded-t-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardTitle className="text-md font-bold">Announcements</CardTitle>
      </motion.div>
      <motion.div 
        className="flex flex-col md:flex-row gap-2 mt-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="relative flex-grow shadow-none rounded-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </Card>
        <Card className="relative flex-grow shadow-none rounded-sm">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </Card>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={newAnnouncement.description} onChange={(e) => setNewAnnouncement({...newAnnouncement, description: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="branchId">Branch ID</Label>
                <Input id="branchId" value={newAnnouncement.branchId} onChange={(e) => setNewAnnouncement({...newAnnouncement, branchId: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="announcerId">Announcer ID</Label>
                <Input id="announcerId" value={newAnnouncement.announcerId} onChange={(e) => setNewAnnouncement({...newAnnouncement, announcerId: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input
                  id="expirationDate"
        type="date"
        value={newAnnouncement.expirationDate.slice(0, 10)}  
        onChange={handleDateChange}
      />
    </div>
              <Button onClick={handleCreateAnnouncement} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollArea className="h-[calc(100vh-230px)] col-span-full lg:col-span-2 pr-4">
          <motion.div layout className="space-y-4">
            <AnimatePresence>
              {filteredAnnouncements.map((announcement) => (
                <motion.div
                  key={announcement.announcementId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg overflow-y-scroll ${
                      selectedAnnouncement?.announcementId === announcement.announcementId ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedAnnouncement(announcement)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span className="text-md font-semibold truncate">{announcement.title}</span>
                        <Badge variant={announcement.isActive ? "default" : "secondary"} className={announcement.isActive ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}>
                          {announcement.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{announcement.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="flex items-center font-bold text-black-800">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(announcement.createdAt)}
                        </span>
                        <span className="flex items-center font-bold text-black-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Expires: {formatDate(announcement.expirationDate)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollArea>
        <AnimatePresence>
          {selectedAnnouncement && (
            <motion.div
              className="col-span-full lg:col-span-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-[calc(100vh-230px)] overflow-auto">
                <CardHeader className="sticky top-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-t-lg">
                  <CardTitle className="flex justify-between items-center">
                    <span>Announcement Details</span>
                    <div className="flex space-x-2">
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="default" size="icon">
                            <Edit className="w-4 h-4 text-blue-800" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Announcement</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="editTitle">Title</Label>
                              <Input id="editTitle" value={selectedAnnouncement.title} onChange={(e) => setSelectedAnnouncement({...selectedAnnouncement, title: e.target.value})} />
                            </div>
                            <div>
                              <Label htmlFor="editDescription">Description</Label>
                              <Textarea id="editDescription" value={selectedAnnouncement.description} onChange={(e) => setSelectedAnnouncement({...selectedAnnouncement, description: e.target.value})} />
                            </div>
                            <div>
                              <Label htmlFor="editBranchId">Branch ID</Label>
                              <Input id="editBranchId" value={selectedAnnouncement.branchId} onChange={(e) => setSelectedAnnouncement({...selectedAnnouncement, branchId: e.target.value})} />
                            </div>
                            <div>
                              <Label htmlFor="editExpirationDate">Expiration Date</Label>
                              <Input id="editExpirationDate" type="date" value={selectedAnnouncement.expirationDate.split('T')[0]} onChange={(e) => setSelectedAnnouncement({...selectedAnnouncement, expirationDate: e.target.value})} />
                            </div>
                            <Button onClick={handleEditAnnouncement} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="default" size="icon" onClick={() => handleDeleteAnnouncement(selectedAnnouncement.announcementId)}>
                        <Trash className="w-4 h-4 text-red-800 font-bold" />
                      </Button>
                      <Button variant="default" size="icon" onClick={() => setSelectedAnnouncement(null)}>
                        <X className="w-4 h-4 text-red-800 font-bold" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <h2 className="text-md font-semibold mb-2">{selectedAnnouncement.title}</h2>
                  <p className="text-sm text-muted-foreground mb-6">{selectedAnnouncement.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-purple-500" />
                      <span><strong>Branch ID:</strong> {selectedAnnouncement.branchId}</span>
                    </div>
                    <div className="flex items-center">
                      <Bell className="w-4 h-4 mr-2 text-purple-500" />
                      <span><strong>Announcer ID:</strong> {selectedAnnouncement.announcerId}</span>
                    </div>
                    <div className="flex items-center">
                      
                      <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                      <span><strong>Created:</strong> {formatDate(selectedAnnouncement.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      <span><strong>Expires:</strong> {formatDate(selectedAnnouncement.expirationDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={selectedAnnouncement.isActive ? "default" : "secondary"} className={selectedAnnouncement.isActive ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}>
                        {selectedAnnouncement.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}