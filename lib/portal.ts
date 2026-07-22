import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  ClipboardList,
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Settings,
  CalendarClock,
} from 'lucide-react'

export type Status =
  | 'completed'
  | 'in-progress'
  | 'pending'
  | 'paid'
  | 'overdue'
  | 'review'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const portalNav: NavItem[] = [
  { label: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/portal/projects', icon: FolderKanban },
  { label: 'Timeline', href: '/portal/timeline', icon: CalendarClock },
  { label: 'Messages', href: '/portal/messages', icon: MessageSquare },
  { label: 'Files', href: '/portal/files', icon: FileText },
  { label: 'Invoices', href: '/portal/invoices', icon: Receipt },
  { label: 'Notifications', href: '/portal/notifications', icon: Bell },
  { label: 'Settings', href: '/portal/settings', icon: Settings },
]

export const quickActions = [
  { label: 'New project', href: '/start', icon: ClipboardList },
  { label: 'Messages', href: '/portal/messages', icon: MessageSquare },
  { label: 'Upload file', href: '/portal/files', icon: FileText },
  { label: 'View timeline', href: '/portal/timeline', icon: CalendarClock },
]
