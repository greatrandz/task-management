import React, { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react'
import { Alert, Platform, AppState, Linking } from 'react-native'
import {StackActions ,useNavigation, DrawerActions, CommonActions, useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import { Screen as MainScreen } from '../../navigation/routes/mainRoutes'
import { Screen as RootScreen } from '../../navigation/routes/rootRoutes'
import Dashboard from './Dashboard'
import { Task } from '@App/models';
import { useTaskContext } from '@App/api/TaskProvider';

interface DashboardProviderProps {
    children: React.ReactElement
}

interface DashboardContextValue {
    tasks: Task[]
    createModalVisible: boolean
    onShowCreateModal: () => void
    onHideCreateModal: () => void
    onCreateNewTask: (task: Task) => void
}

const DashboardContext = createContext<DashboardContextValue>({
    tasks: [],
    createModalVisible: false,
    onShowCreateModal: () => {},
    onHideCreateModal: () => {},
    onCreateNewTask: () => { },
})

const DashboardProvider = ({children}: DashboardProviderProps) =>  {
    const navigation = useNavigation()
    const { tasks, createNewTask } = useTaskContext()

    const [createModalVisible, setCreateModalVisible] = React.useState(false);

    const onShowCreateModal = useCallback(() => setCreateModalVisible(true), [])

    const onHideCreateModal = useCallback(() => setCreateModalVisible(false), [])

    const onCreateNewTask = useCallback((task: Task) => {
        if (task.name && task.description && task.status) {
            createNewTask(task, (error: any) => {
                onHideCreateModal()
                if (error) {
                    Toast.show({
                        type: 'error',  // Type of toast message
                        position: 'top',  // Position of toast on the screen
                        text1: 'Failure!',  // Main text
                        text2: 'Something went wrong. Please check your internet connection', 
                    });
                }
                else {
                    Toast.show({
                        type: 'success',  // Type of toast message
                        position: 'top',  // Position of toast on the screen
                        text1: 'Success!',  // Main text
                        text2: 'Successfully Added!',  // Subtext
                    });
                }
            })
        }
    }, [])

    const value = {
        tasks,
        createModalVisible,
        onShowCreateModal,
        onHideCreateModal,
        onCreateNewTask,
    }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardProvider
