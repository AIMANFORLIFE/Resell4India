import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { User } from '@supabase/supabase-js'
import { showAuthError, showSuccess, showError, showApiError } from '../utils/toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    console.log('Initializing AuthProvider...')
    try {
      // Check active sessions and sets the user
      console.log('Attempting to get session...')
      supabase.auth.getSession().then(({ data: { session }, error: sessionError }) => {
        if (sessionError) {
          console.error('Session error:', sessionError)
          setError(sessionError)
          setLoading(false)
          return
        }
        console.log('Session retrieved:', session ? 'User logged in' : 'No user')
        setUser(session?.user ?? null)
        setLoading(false)
      }).catch(err => {
        console.error('Error getting session:', err)
        setError(err)
        setLoading(false)
      })

      // Listen for changes on auth state (signed in, signed out, etc.)
      console.log('Setting up auth state listener...')
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('Auth state changed:', _event)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => {
        console.log('Cleaning up auth subscription...')
        subscription.unsubscribe()
      }
    } catch (err) {
      console.error('Error initializing auth:', err)
      setError(err instanceof Error ? err : new Error('Failed to initialize auth'))
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      showSuccess('Sign up successful! Please check your email for verification.')
    } catch (error) {
      showAuthError(error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      showSuccess('Sign in successful!')
    } catch (error) {
      showAuthError(error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      showSuccess('Signed out successfully!')
    } catch (error) {
      showAuthError(error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 