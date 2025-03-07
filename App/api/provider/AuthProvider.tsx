import React, { createContext, useContext, } from 'react'
import { AppState, Platform } from 'react-native'
import { supabase } from '../supabase.module'
import { Session } from '@supabase/supabase-js'
import { useNavigation } from '@react-navigation/native'
import { useAuthService } from '@App/ducks/hooks'
const isWeb = Platform.OS === 'web'

interface AuthProviderProps {
    children: React.ReactElement
}

export interface AuthContextValue {
    loading: boolean
    loadingMessage: string
    accessToken: string | null
}

const AuthContext = createContext<AuthContextValue>({
    loading: false,
    loadingMessage: "",
    accessToken: null,
})

const AuthProvider = ({ children }: AuthProviderProps) =>  {
    const navigation = useNavigation()
    const { accessToken, onResetLoading, onSignUpSuccess } = useAuthService()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [loadingMessage, setLoadingMessage] = React.useState<string>("")
    const [session, setSession] = React.useState<Session | null>(null)

    React.useEffect(() => {
        onResetLoading()

        const dispose = AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                if (!isWeb && !accessToken) {
                    setTimeout(() => onResetLoading(), 15000);
                }
                supabase.auth.startAutoRefresh()
            } else {
                supabase.auth.stopAutoRefresh()
            }
        })

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
            if (session) {
                onSignUpSuccess(session)
            }
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false)
            if (session) {
                onSignUpSuccess(session)
            }
        })
        return () => {
            dispose.remove()
        }
    }, [])

    const value = {
        loading,
        loadingMessage,
        accessToken: session?.access_token ?? null as any,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider