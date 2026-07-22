'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * Client-side portal store.
 *
 * This is intentionally backed by localStorage so the portal behaves like a
 * real, per-client account without a backend. Everything starts EMPTY — there
 * is no seeded/demo client data. Submitting the onboarding questionnaire is
 * what creates a client's first project, notification, and profile details.
 *
 * The shape here is designed to map cleanly onto a future API/database:
 * swap the localStorage read/write for fetch calls and the UI stays the same.
 */

export type ProjectStatus = 'pending' | 'in-progress' | 'completed'

export interface ClientProfile {
  name: string
  business: string
  email: string
  phone: string
  website: string
  industry: string
  address: string
  hours: string
  role: string
  timezone: string
  about: string
  companySize: string
}

export interface PortalProject {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number
  phase: string
  createdAt: string
}

export interface QuestionnaireSubmission {
  id: string
  projectId: string
  submittedAt: string
  values: Record<string, string | string[]>
  fileNames: Record<string, string[]>
}

export interface PortalNotification {
  id: string
  title: string
  body: string
  createdAt: string
  read: boolean
}

export interface AppearanceSettings {
  reducedMotion: boolean
  accent: string
}

export interface PortalState {
  profile: ClientProfile
  projects: PortalProject[]
  submissions: QuestionnaireSubmission[]
  notifications: PortalNotification[]
  notificationPrefs: Record<string, boolean>
  appearance: AppearanceSettings
}

const STORAGE_KEY = 'forge-portal-state-v1'

/** Selectable portal accent colors (all premium gold-family tones). */
export const ACCENT_OPTIONS = [
  { id: 'gold', label: 'Signature Gold' },
  { id: 'amber', label: 'Warm Amber' },
  { id: 'champagne', label: 'Champagne' },
] as const

export const ACCENT_VALUES: Record<string, string> = {
  gold: 'oklch(0.82 0.13 85)',
  amber: 'oklch(0.78 0.15 65)',
  champagne: 'oklch(0.86 0.08 92)',
}

const emptyProfile: ClientProfile = {
  name: '',
  business: '',
  email: '',
  phone: '',
  website: '',
  industry: '',
  address: '',
  hours: '',
  role: '',
  timezone: 'et',
  about: '',
  companySize: '',
}

const defaultState: PortalState = {
  profile: emptyProfile,
  projects: [],
  submissions: [],
  notifications: [],
  notificationPrefs: {
    projects: true,
    messages: true,
    invoices: true,
    files: true,
    marketing: false,
  },
  appearance: {
    reducedMotion: false,
    accent: 'gold',
  },
}

interface PortalContextValue {
  state: PortalState
  hydrated: boolean
  unreadCount: number
  updateProfile: (patch: Partial<ClientProfile>) => void
  submitQuestionnaire: (
    values: Record<string, string | string[]>,
    fileNames: Record<string, string[]>,
  ) => string
  markAllNotificationsRead: () => void
  updateNotificationPrefs: (prefs: Record<string, boolean>) => void
  updateAppearance: (patch: Partial<AppearanceSettings>) => void
  resetPortal: () => void
}

const PortalContext = createContext<PortalContextValue | null>(null)

function firstString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function PortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(defaultState)
  const [hydrated, setHydrated] = useState(false)

  // Load persisted state once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PortalState>
        setState({
          ...defaultState,
          ...parsed,
          profile: { ...emptyProfile, ...(parsed.profile ?? {}) },
          appearance: { ...defaultState.appearance, ...(parsed.appearance ?? {}) },
          notificationPrefs: {
            ...defaultState.notificationPrefs,
            ...(parsed.notificationPrefs ?? {}),
          },
        })
      }
    } catch {
      /* ignore malformed state */
    }
    setHydrated(true)
  }, [])

  // Persist whenever state changes (after hydration).
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be unavailable */
    }
  }, [state, hydrated])

  // Apply reduced-motion preference to the document.
  useEffect(() => {
    if (!hydrated) return
    document.documentElement.dataset.reducedMotion = state.appearance.reducedMotion
      ? 'true'
      : 'false'
    return () => {
      delete document.documentElement.dataset.reducedMotion
    }
  }, [state.appearance.reducedMotion, hydrated])

  // Apply the chosen accent color to the portal by overriding theme tokens.
  useEffect(() => {
    if (!hydrated) return
    const root = document.documentElement
    const value = ACCENT_VALUES[state.appearance.accent] ?? ACCENT_VALUES.gold
    const tokens = ['--primary', '--gold', '--ring', '--sidebar-primary']
    tokens.forEach((t) => root.style.setProperty(t, value))
    return () => {
      tokens.forEach((t) => root.style.removeProperty(t))
    }
  }, [state.appearance.accent, hydrated])

  const updateProfile = useCallback((patch: Partial<ClientProfile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))
  }, [])

  const submitQuestionnaire = useCallback(
    (
      values: Record<string, string | string[]>,
      fileNames: Record<string, string[]>,
    ) => {
      const projectId = makeId('proj')
      const submissionId = makeId('sub')
      const now = new Date().toISOString()

      const business = firstString(values.businessName)
      const projectName = business ? `${business} Website` : 'New Website Project'

      const project: PortalProject = {
        id: projectId,
        name: projectName,
        description:
          firstString(values.primaryGoal) ||
          'Website project submitted through the onboarding questionnaire.',
        status: 'in-progress',
        progress: 5,
        phase: 'Discovery',
        createdAt: now,
      }

      const submission: QuestionnaireSubmission = {
        id: submissionId,
        projectId,
        submittedAt: now,
        values,
        fileNames,
      }

      const notification: PortalNotification = {
        id: makeId('notif'),
        title: 'Questionnaire received',
        body: `We received the onboarding details for ${projectName}. Your team will review them before kickoff.`,
        createdAt: now,
        read: false,
      }

      setState((s) => {
        // If the client hasn't filled a profile yet, seed it from the questionnaire.
        const profile: ClientProfile =
          s.profile.name || s.profile.business
            ? s.profile
            : {
                ...s.profile,
                name: firstString(values.ownerName),
                business: business,
                email: firstString(values.email),
                phone: firstString(values.phone),
                website: firstString(values.existingWebsite),
                industry: firstString(values.industry),
                address: firstString(values.address),
                hours: firstString(values.hours),
              }

        return {
          ...s,
          profile,
          projects: [project, ...s.projects],
          submissions: [submission, ...s.submissions],
          notifications: [notification, ...s.notifications],
        }
      })

      return projectId
    },
    [],
  )

  const markAllNotificationsRead = useCallback(() => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }))
  }, [])

  const updateNotificationPrefs = useCallback((prefs: Record<string, boolean>) => {
    setState((s) => ({ ...s, notificationPrefs: { ...s.notificationPrefs, ...prefs } }))
  }, [])

  const updateAppearance = useCallback((patch: Partial<AppearanceSettings>) => {
    setState((s) => ({ ...s, appearance: { ...s.appearance, ...patch } }))
  }, [])

  const resetPortal = useCallback(() => {
    setState(defaultState)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const unreadCount = useMemo(
    () => state.notifications.filter((n) => !n.read).length,
    [state.notifications],
  )

  const value = useMemo<PortalContextValue>(
    () => ({
      state,
      hydrated,
      unreadCount,
      updateProfile,
      submitQuestionnaire,
      markAllNotificationsRead,
      updateNotificationPrefs,
      updateAppearance,
      resetPortal,
    }),
    [
      state,
      hydrated,
      unreadCount,
      updateProfile,
      submitQuestionnaire,
      markAllNotificationsRead,
      updateNotificationPrefs,
      updateAppearance,
      resetPortal,
    ],
  )

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

export function usePortal() {
  const ctx = useContext(PortalContext)
  if (!ctx) throw new Error('usePortal must be used within a PortalProvider')
  return ctx
}

/** Derive a standard milestone timeline from a submitted project. */
export interface DerivedMilestone {
  title: string
  status: 'completed' | 'in-progress' | 'pending'
  description: string
}

export function deriveMilestones(project: PortalProject): DerivedMilestone[] {
  return [
    {
      title: 'Questionnaire received',
      status: 'completed',
      description: 'Your onboarding details were submitted and logged.',
    },
    {
      title: 'Discovery & Strategy',
      status: 'in-progress',
      description: 'We review your goals and prepare for the kickoff call.',
    },
    {
      title: 'Design',
      status: 'pending',
      description: 'High-fidelity designs for every key page.',
    },
    {
      title: 'Development',
      status: 'pending',
      description: 'Building responsive, high-performance pages.',
    },
    {
      title: 'Revisions & QA',
      status: 'pending',
      description: 'Cross-device testing and final refinements.',
    },
    {
      title: 'Launch',
      status: 'pending',
      description: 'Go live with analytics and post-launch support.',
    },
  ]
}

/** Format initials from a name; returns empty string when no name. */
export function initialsFromName(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
