import { MdOutlineDashboardCustomize, MdAccountTree, MdAssignmentAdd, MdOutlineSchool, MdMarkEmailUnread,MdVideoCall } from "react-icons/md";
import {FaUserFriends, FaUsers, FaVideo} from "react-icons/fa"
import { GrAnnounce } from "react-icons/gr";
import { RiUserAddFill } from "react-icons/ri";
const menuItems = [
  { icon: MdOutlineDashboardCustomize, text: 'Dashboard', href: '/' },
  { icon: MdOutlineSchool, text: 'Lectures', href: '/lectures' },
  { icon: MdAssignmentAdd, text: 'Assignments', href: '/assignments' },
  { icon: FaUserFriends, text: 'Students', href: '/students' },
  // { icon: FaUsers, text: 'Faculties', href: '/faculties' },
  { icon: MdVideoCall, text: 'Online Classes', href: '/online-classes' },
  { icon: MdAccountTree, text: 'Departments', href: '/departments' },
  { icon: GrAnnounce, text: 'Announcements', href: '/announcements' },
  { icon: MdMarkEmailUnread, text: 'Notifications', href: '/notifications' },
  { icon: RiUserAddFill, text: 'Add User', href: '/add-user' }
]

export default menuItems