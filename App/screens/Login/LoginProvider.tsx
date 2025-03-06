import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { connect, ConnectedProps, useStore, } from 'react-redux'
import {StackActions ,useNavigation, DrawerActions, useFocusEffect, CommonActions} from '@react-navigation/native'

import Login from './Login'
import { Alert } from 'react-native'

interface LoginProviderProps {
    children: React.ReactElement
}

interface LoginContextValue {
    data: any
}

const LoginContext = createContext<LoginContextValue>({
    data: []
})

const LoginProvider = ({ children }: LoginProviderProps) =>  {
    const navigation = useNavigation()

    const value = {
        data: []
    }

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => useContext(LoginContext)

export default LoginProvider

