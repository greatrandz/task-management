import React, { createContext, useContext, } from 'react'
import { AppState, Platform } from 'react-native'
import { supabase } from './supabase.module'
import { Session } from '@supabase/supabase-js'
import { useNavigation } from '@react-navigation/native'
const isWeb = Platform.OS === 'web'

// const handleSignUp = async (email: string, password: string) => {
//     const redirectUrl = 'myapp://home'; // Custom scheme redirect for the app
  
//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         redirectTo: redirectUrl
//       }
//     });
  
//     if (error) {
//       console.error('Error during sign up:', error.message);
//     } else {
//       console.log('Sign up successful, check your email!');
//     }
//   };

interface AuthProviderProps {
    children: React.ReactElement
}

interface AuthContextValue {
    loading: boolean
    loadingMessage: string
    accessToken: string
    signInWithEmail: (email: string, password: string, completion: Function) => void
    signUpWithEmail: (email: string, password: string, completion: Function) => void
    signOut: () => void
}

const AuthContext = createContext<AuthContextValue>({
    loading: false,
    loadingMessage: "",
    accessToken: null as any,
    signInWithEmail: () => { },
    signUpWithEmail: () => { },
    signOut: () => { }
})

const AuthProvider = ({ children }: AuthProviderProps) =>  {
    const navigation = useNavigation()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [loadingMessage, setLoadingMessage] = React.useState<string>("")
    const [session, setSession] = React.useState<Session | null>(null)

    React.useEffect(() => {
        const dispose = AppState.addEventListener('change', (state) => {
            if (state === 'active') {
              supabase.auth.startAutoRefresh()
            } else {
              supabase.auth.stopAutoRefresh()
            }
        })

      supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false)
      })
      return () => {
        dispose.remove()
      }
    }, [])

    
      
    const signInWithEmail = async (email: string, password: string, completion: Function) => {
        setLoading(true)
        setLoadingMessage('')
        supabase.auth.signInWithPassword({ email: email, password: password,  })
            .then((result) => {
                completion(result)
                if (result.error) {
                    setLoading(false)
                }
            })
    }
      
    const signUpWithEmail = (email: string, password: string, completion: Function) => {
        // const {
        //   data: { session },
        //   error,
        // } 
        setLoading(true)
        setLoadingMessage(`We've sent a verification email to ${email}. Please check your inbox.`);
        supabase.auth.signUp({ email, password } )
            .then((result) => {
                completion(result)
                if (result.error) {
                    setLoading(false)
                }
                else if (!isWeb) {
                    setTimeout(() => {
                        setLoading(false)
                    }, 10000);
                }
            })
    }
      
    const signOut = async () => {
        setLoading(true)
        setLoadingMessage('')
        await supabase.auth.signOut()
    }

    const value = {
        loading,
        loadingMessage,
        accessToken: session?.access_token ?? null as any,
        signInWithEmail,
        signUpWithEmail,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider