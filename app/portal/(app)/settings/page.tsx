'use client'

import { useState } from 'react'
import { Bell, Building2, Check, Lock, Palette, User } from 'lucide-react'
import {
  usePortal,
  initialsFromName,
  ACCENT_OPTIONS,
  ACCENT_VALUES,
} from '@/lib/portal-store'
import { PortalPageHeader } from '@/components/portal/page-header'
import { PortalCard } from '@/components/portal/portal-ui'
import { Input, Label, Select, Textarea } from '@/components/ui/form-field'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'theme', label: 'Appearance', icon: Palette },
]

const notificationMeta = [
  { id: 'projects', label: 'Project updates', desc: 'Milestones, progress, and status changes.' },
  { id: 'messages', label: 'New messages', desc: 'When your project team sends you a message.' },
  { id: 'invoices', label: 'Invoices & payments', desc: 'New invoices and payment reminders.' },
  { id: 'files', label: 'File uploads', desc: 'When new files are shared with you.' },
  { id: 'marketing', label: 'Marketing', desc: 'Occasional news and offers from Forge.' },
]

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-muted',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 size-5 rounded-full bg-background transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5',
        )}
      />
    </button>
  )
}

function SaveButton({ saved }: { saved: boolean }) {
  return (
    <button
      type="submit"
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all',
        saved
          ? 'bg-emerald-500/15 text-emerald-400'
          : 'bg-primary text-primary-foreground hover:opacity-90',
      )}
    >
      {saved ? (
        <>
          <Check className="size-4" />
          Saved
        </>
      ) : (
        'Save changes'
      )}
    </button>
  )
}

function useSaveFlag() {
  const [saved, setSaved] = useState(false)
  const flash = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }
  return [saved, flash] as const
}

function ProfilePanel() {
  const { state, updateProfile } = usePortal()
  const { profile } = state
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [role, setRole] = useState(profile.role)
  const [timezone, setTimezone] = useState(profile.timezone || 'et')
  const [saved, flash] = useSaveFlag()

  return (
    <PortalCard title="Profile">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateProfile({ name, email, role, timezone })
          flash()
        }}
      >
        <div className="mb-6 flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
            {initialsFromName(name) || <User className="size-6" />}
          </span>
          <div className="text-sm text-muted-foreground">
            Your initials are used as your portal avatar.
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} placeholder="Your full name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} placeholder="you@business.com" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={role} placeholder="e.g. Owner" onChange={(e) => setRole(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="timezone">Time zone</Label>
            <Select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="et">Eastern (ET)</option>
              <option value="ct">Central (CT)</option>
              <option value="mt">Mountain (MT)</option>
              <option value="pt">Pacific (PT)</option>
            </Select>
          </div>
        </div>
        <div className="mt-6">
          <SaveButton saved={saved} />
        </div>
      </form>
    </PortalCard>
  )
}

function BusinessPanel() {
  const { state, updateProfile } = usePortal()
  const { profile } = state
  const [form, setForm] = useState({
    business: profile.business,
    website: profile.website,
    industry: profile.industry,
    phone: profile.phone,
    address: profile.address,
    hours: profile.hours,
    companySize: profile.companySize,
    about: profile.about,
  })
  const [saved, flash] = useSaveFlag()

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <PortalCard title="Business details">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateProfile(form)
          flash()
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="business">Business name</Label>
            <Input id="business" value={form.business} placeholder="Your business name" onChange={(e) => set('business')(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={form.website} placeholder="yourbusiness.com" onChange={(e) => set('website')(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" value={form.industry} placeholder="e.g. Home Services" onChange={(e) => set('industry')(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={form.phone} placeholder="(000) 000-0000" onChange={(e) => set('phone')(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address">Business address</Label>
            <Input id="address" value={form.address} placeholder="Street, City, State ZIP" onChange={(e) => set('address')(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="hours">Business hours</Label>
            <Input id="hours" value={form.hours} placeholder="Mon–Fri, 9am–6pm" onChange={(e) => set('hours')(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="employees">Company size</Label>
            <Select id="employees" value={form.companySize} onChange={(e) => set('companySize')(e.target.value)}>
              <option value="">Select size</option>
              <option value="1-5">1–5 employees</option>
              <option value="6-10">6–10 employees</option>
              <option value="11-50">11–50 employees</option>
              <option value="50+">50+ employees</option>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="about">About the business</Label>
            <Textarea
              id="about"
              rows={3}
              value={form.about}
              placeholder="Tell us about your business, mission, and what makes you different."
              onChange={(e) => set('about')(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6">
          <SaveButton saved={saved} />
        </div>
      </form>
    </PortalCard>
  )
}

function NotificationsPanel() {
  const { state, updateNotificationPrefs } = usePortal()
  const [prefs, setPrefs] = useState(state.notificationPrefs)
  const [saved, flash] = useSaveFlag()

  return (
    <PortalCard title="Notification preferences">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          updateNotificationPrefs(prefs)
          flash()
        }}
      >
        <ul className="divide-y divide-border">
          {notificationMeta.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-4 py-4 first:pt-0">
              <div>
                <p className="text-sm font-medium text-foreground">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <Toggle
                label={p.label}
                checked={prefs[p.id] ?? false}
                onChange={(v) => setPrefs((cur) => ({ ...cur, [p.id]: v }))}
              />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <SaveButton saved={saved} />
        </div>
      </form>
    </PortalCard>
  )
}

function PasswordPanel() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saved, flash] = useSaveFlag()
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!current) return setError('Please enter your current password.')
    if (next.length < 8) return setError('New password must be at least 8 characters.')
    if (next !== confirm) return setError('New passwords do not match.')
    setCurrent('')
    setNext('')
    setConfirm('')
    flash()
  }

  return (
    <PortalCard title="Change password">
      <form onSubmit={submit} className="grid max-w-md gap-5">
        <div>
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" placeholder="••••••••" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" placeholder="At least 8 characters" value={next} onChange={(e) => setNext(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input id="confirm" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <div>
          <SaveButton saved={saved} />
        </div>
      </form>
    </PortalCard>
  )
}

function AppearancePanel() {
  const { state, updateAppearance } = usePortal()
  const { appearance } = state

  return (
    <PortalCard title="Appearance">
      <div className="flex items-center justify-between gap-4 py-2">
        <div>
          <p className="text-sm font-medium text-foreground">Reduced motion</p>
          <p className="text-xs text-muted-foreground">
            Minimize animations and transitions across the portal.
          </p>
        </div>
        <Toggle
          label="Reduced motion"
          checked={appearance.reducedMotion}
          onChange={(v) => updateAppearance({ reducedMotion: v })}
        />
      </div>

      <div className="border-t border-border py-4">
        <p className="text-sm font-medium text-foreground">Accent color</p>
        <p className="text-xs text-muted-foreground">
          Choose your portal highlight color — applied instantly.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {ACCENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateAppearance({ accent: opt.id })}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors',
                appearance.accent === opt.id
                  ? 'border-primary/60 bg-primary/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/30',
              )}
            >
              <span
                className="size-5 rounded-full ring-2 ring-white/10"
                style={{ backgroundColor: ACCENT_VALUES[opt.id] }}
              />
              {opt.label}
              {appearance.accent === opt.id ? <Check className="size-4 text-primary" /> : null}
            </button>
          ))}
        </div>
      </div>
    </PortalCard>
  )
}

export default function SettingsPage() {
  const [tab, setTab] = useState('profile')

  return (
    <>
      <PortalPageHeader title="Settings" description="Manage your account, business, and preferences." />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Settings sections">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? 'true' : undefined}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                  tab === t.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="size-4" />
                {t.label}
              </button>
            )
          })}
        </nav>

        <div>
          {tab === 'profile' && <ProfilePanel />}
          {tab === 'business' && <BusinessPanel />}
          {tab === 'notifications' && <NotificationsPanel />}
          {tab === 'password' && <PasswordPanel />}
          {tab === 'theme' && <AppearancePanel />}
        </div>
      </div>
    </>
  )
}
