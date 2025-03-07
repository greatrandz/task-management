import React, { createContext, useCallback, useContext, } from 'react'
import { AppState, Platform } from 'react-native'
import { supabase } from '../supabase.module'
import { Session } from '@supabase/supabase-js'
import { useNavigation } from '@react-navigation/native'
import { Task } from '../../models'
import { useTaskService } from '@App/ducks/hooks'
const isWeb = Platform.OS === 'web'


interface TaskProviderProps {
    children: React.ReactElement
}

interface TaskContextValue {
    tasks: Task[]
}

const TaskContext = createContext<TaskContextValue>({
    tasks: [],
})

const TaskProvider = ({ children }: TaskProviderProps) =>  {
    const { tasks, onLoadTasks, onDeleteTaskSuccess, onCreateNewTaskSuccess, onUpdateTaskSuccess } = useTaskService()
   
    let taskSubscription: any = null;  // Type it as 'any' because Supabase's Realtime subscription doesn't have strict typing

    const onSetCreatedTask = useCallback((newTask: Task) => {
        onCreateNewTaskSuccess([...tasks, newTask])
    }, [tasks])

    const onSetUpdatedTask = useCallback((updatedTask: Task) => {
        const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task) as Task)
        onUpdateTaskSuccess(updatedTasks)
    }, [tasks])

    const onSetDeletedTask = useCallback((deletedTask: Task) => {
        const updatedTasks = tasks.filter((task) => task.id !== deletedTask.id)
        onDeleteTaskSuccess(updatedTasks)
    }, [tasks])

    // Set up Realtime Subscription to listen for new users
    React.useEffect(() => {
        // Subscribe to the 'INSERT' event on 'users' table
        taskSubscription = supabase
        .channel('tasks') // Create a new channel to listen to
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => {
            // This is the callback function where we handle the data from the event
            console.log('New user inserted:', payload);
            onSetCreatedTask(payload.new as Task)
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => {
            // Handle the 'UPDATE' event
            console.log('Task updated:', payload);
            onSetUpdatedTask(payload.new as Task)
        })
        // .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, (payload) => {
        //     // Handle the 'DELETE' event
        //     console.log('Task deleted:', payload);
        //     onSetDeletedTask(payload.old as Task)
        // })
        .subscribe();
        
        onLoadTasks()

        // Clean up the subscription when the component unmounts
        return () => {
            if (taskSubscription) {
                taskSubscription.unsubscribe();
            }
        };
    }, []);

    const value = {
        tasks,
        // createNewTask,
        // updateTask,
        // deleteTask,
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => useContext(TaskContext)

export default TaskProvider