import React, { createContext, useContext, } from 'react'
import { AppState, Platform } from 'react-native'
import { supabase } from './supabase.module'

const signInWithEmail = async (email: string, password: string) => 
    await supabase
            .auth.signInWithPassword({ email, password, })
  
const signUpWithEmail = async (email: string, password: string) => 
    await supabase
            .auth.signUp({ email, password } )
  
const signOut = async () => {
    await supabase.auth.signOut()
}

export type AuthAPI = {
    signInWithEmail: (email: string, password: string) => void
    signUpWithEmail: (email: string, password: string) => void
    signOut: () => void
}

export default {
    signInWithEmail,
    signUpWithEmail,
    signOut,
}