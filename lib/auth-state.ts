/**
 * Shared, client-safe types and constants for the auth forms.
 * Kept out of the `'use server'` action file, which may only export async
 * functions.
 */

export interface AuthActionState {
  status: 'idle' | 'error' | 'info'
  message: string
}

export const initialAuthState: AuthActionState = { status: 'idle', message: '' }
