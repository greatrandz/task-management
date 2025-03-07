import React, { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react'
import { Alert, Platform, AppState, Linking } from 'react-native'
import {StackActions ,useNavigation, DrawerActions, CommonActions, useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import { Screen as MainScreen } from '../../navigation/routes/mainRoutes'
import { Screen as RootScreen } from '../../navigation/routes/rootRoutes'
import { Task } from '@App/models';
import useTaskService from '@App/ducks/hooks/useTaskService';

interface DashboardProviderProps {
    children: React.ReactElement
}

interface DashboardContextValue {
    tasks: Task[]
    completedTasks: Task [];
    pendingTasks: Task [];
    developmentTasks: Task [];
    selectedTask: Task | null;
    deleteModalVisible: boolean
    createModalVisible: boolean
    onShowCreateModal: (task: Task | null) => void
    onHideCreateModal: () => void
    onShowDeleteModal: (task: Task) => void
    onHideDeleteModal: () => void
    onSaveTask: (task: Task | null) => void
    onDeleteTaskItem: (task: Task | null) => void
}

const DashboardContext = createContext<DashboardContextValue>({
    tasks: [],
    completedTasks: [],
    pendingTasks: [],
    developmentTasks: [],
    selectedTask: null,
    deleteModalVisible: false,
    createModalVisible: false,
    onShowCreateModal: () => {},
    onHideCreateModal: () => {},
    onShowDeleteModal: () => {},
    onHideDeleteModal: () => {},
    onSaveTask: () => { },
    onDeleteTaskItem: () => { },
})

const DashboardProvider = ({children}: DashboardProviderProps) =>  {
    const navigation = useNavigation()
    const { error, tasks, onCreateNewTask, onUpdateTask, onDeleteTask } = useTaskService()
    const [selectedTask, setSelectedTask] = React.useState<Task | null>(null)
    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
    const [createModalVisible, setCreateModalVisible] = React.useState(false);

    const onShowCreateModal = useCallback((task: Task | null) => {
        setCreateModalVisible(true)
        if (task) {
            setSelectedTask(task)
        }
    }, [])
    const onHideCreateModal = useCallback(() => setCreateModalVisible(false), [])
    
    const onShowDeleteModal = useCallback((task: Task) => {
        setSelectedTask(task)
        setDeleteModalVisible(true)
    }, [])
    const onHideDeleteModal = useCallback(() => setDeleteModalVisible(false), [])

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error',  // Type of toast message
                position: 'top',  // Position of toast on the screen
                text1: 'Failure!',  // Main text
                text2: 'Something went wrong. Please check your internet connection', 
            });
        }
    }, [error])

    const onSaveTask = useCallback((task: Task | null) => {
        if (task) {
            if (task.name && task.description && task.status) {
                onHideCreateModal()
                if (task.id) {
                    onUpdateTask(task)
                }
                else {
                    onCreateNewTask(task)
                }
                setSelectedTask(null)
            }
        }
    }, [])

    const onDeleteTaskItem = useCallback((task: Task | null) => {
        if (task) {
            onHideDeleteModal()
            onDeleteTask(task)
        }
    }, [])

    const value = {
        tasks,
        completedTasks: tasks?.filter(task => task?.status?.toLowerCase().includes("complete")) ?? [],
        pendingTasks: tasks?.filter(task => task?.status?.toLowerCase().includes("pending")) ?? [],
        developmentTasks: tasks?.filter(task => (!task?.status?.toLowerCase().includes("complete") && !task?.status?.toLowerCase().includes("pending"))) ?? [],
        selectedTask,
        deleteModalVisible,
        createModalVisible,
        onShowCreateModal,
        onHideCreateModal,
        onShowDeleteModal,
        onHideDeleteModal,
        onSaveTask,
        onDeleteTaskItem,
    }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardProvider
