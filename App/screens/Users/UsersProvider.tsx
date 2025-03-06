import React, { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react'
import { Alert, Platform, AppState, Linking } from 'react-native'
import {StackActions ,useNavigation, DrawerActions, CommonActions, useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import { Screen as MainScreen } from '../../navigation/routes/mainRoutes'
import { Screen as RootScreen } from '../../navigation/routes/rootRoutes'
import Users from './Users'

interface UsersProviderProps {
    children: React.ReactElement
}

interface UsersContextValue {
    data: any
}

const UsersContext = createContext<UsersContextValue>({
    data: []
})

const UsersProvider = ({children}: UsersProviderProps) =>  {
    const navigation = useNavigation()

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const onLogin = () => {
        navigation.dispatch(StackActions.push(MainScreen.Login))
    }

    const value = {
        data: []
    }

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext)

export default UsersProvider
