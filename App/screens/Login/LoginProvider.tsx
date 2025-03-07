import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { connect, ConnectedProps, useStore, } from 'react-redux'
import {StackActions ,useNavigation, DrawerActions, useFocusEffect, CommonActions} from '@react-navigation/native'
// import { useAuthContext } from '@App/api'
import { useAuthService } from '@App/ducks/hooks'
import Toast from 'react-native-toast-message'
import { Platform } from 'react-native'
const isWeb = Platform.OS === 'web'

interface LoginProviderProps {
    children: React.ReactElement
}

interface LoginContextValue {
    data: any,
    onSignInWithEmail: (email: string, password: string) => void
    onSignUpWithEmail: (email: string, password: string) => void
}

const LoginContext = createContext<LoginContextValue>({
    data: [],
    onSignInWithEmail: () => { },
    onSignUpWithEmail: () => { }
})

const LoginProvider = ({ children }: LoginProviderProps) =>  {
    const navigation = useNavigation()
    const { error, onSignIn, onSignUp} = useAuthService()

    React.useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',  // Type of toast message
                position: 'top',  // Position of toast on the screen
                text1: 'Invalid email or password',  // Main text
                text2: 'Please check your credentials and try again.',  // Subtext
            });
        }
    }, [error])

    const onSignInWithEmail = (email: string, password: string) => {
        onSignIn({ email, password })
    }

    const onSignUpWithEmail = async (email: string, password: string) => {
        onSignUp({ email, password })
    }

    const value = {
        data: [],
        onSignInWithEmail,
        onSignUpWithEmail
    }

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => useContext(LoginContext)

export default LoginProvider

