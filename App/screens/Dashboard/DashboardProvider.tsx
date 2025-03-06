import React, { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react'
import { Alert, Platform, AppState, Linking } from 'react-native'
import {StackActions ,useNavigation, DrawerActions, CommonActions, useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import { Screen as MainScreen } from '../../navigation/routes/mainRoutes'
import { Screen as RootScreen } from '../../navigation/routes/rootRoutes'
import Dashboard from './Dashboard'

interface DashboardProviderProps {
    children: React.ReactElement
}

interface DashboardContextValue {
    createModalVisible: boolean
    onShowCreateModal: () => void
    onHideCreateModal: () => void
}

const DashboardContext = createContext<DashboardContextValue>({
    createModalVisible: false,
    onShowCreateModal: () => {},
    onHideCreateModal: () => {}
})

const DashboardProvider = ({children}: DashboardProviderProps) =>  {
    const navigation = useNavigation()
    const [createModalVisible, setCreateModalVisible] = React.useState(false);

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer())
    }

    const onLogin = () => {
        navigation.dispatch(StackActions.push(MainScreen.Login))
    }

    const onShowCreateModal = useCallback(() => setCreateModalVisible(true), [])

    const onHideCreateModal = useCallback(() => setCreateModalVisible(false), [])

    const value = {
        createModalVisible,
        onShowCreateModal,
        onHideCreateModal,
    }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardProvider
