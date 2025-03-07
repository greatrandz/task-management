import React, { createContext, useContext, } from 'react'
import { AppState, Platform } from 'react-native'
import { supabase } from './supabase.module'
import { Session } from '@supabase/supabase-js'
import { useNavigation } from '@react-navigation/native'
import { Task } from '../models'
const isWeb = Platform.OS === 'web'


interface TaskProviderProps {
    children: React.ReactElement
}

interface TaskContextValue {
    tasks: Task[]
    createNewTask: (task: Task, completion: Function) => void
}

const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    createNewTask: () => { }
})

const TaskProvider = ({ children }: TaskProviderProps) =>  {
    const [tasks, setTasks] = React.useState<Task[]>([]);  // Type the users state as an array of User objects

    // Store the subscription to unsubscribe later
    let taskSubscription: any = null;  // Type it as 'any' because Supabase's Realtime subscription doesn't have strict typing

    const createNewTask = async (task: Task, completion: Function): Promise<void> => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([task]);

            if (error) {
                console.error('Error creating user:', error);
                completion(error)
            } else {
                console.log('User created:', data);
                completion(null)
            }
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    // Set up Realtime Subscription to listen for new users
    React.useEffect(() => {
        // Subscribe to the 'INSERT' event on 'users' table
        taskSubscription = supabase
        .channel('tasks') // Create a new channel to listen to
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => {
            // This is the callback function where we handle the data from the event
            console.log('New user inserted:', payload);
            setTasks((prevTasks: Task[]) => [...prevTasks, payload.new as Task]);
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'tasks' }, (payload) => {
            // Handle the 'UPDATE' event
            console.log('Task updated:', payload);
            setTasks((prevTasks) => prevTasks.map((task) => (task.id === payload.new.id ? payload.new : task) as Task));
        })
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'tasks' }, (payload) => {
            // Handle the 'DELETE' event
            console.log('Task deleted:', payload);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== payload.old.id));
        })
        .subscribe();

        // Fetch initial users
        const fetchTasks = async (): Promise<void> => {
            const { data, error } = await supabase.from('tasks').select();
            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setTasks(data || []);
            }
        };

        fetchTasks();

        // Clean up the subscription when the component unmounts
        return () => {
            if (taskSubscription) {
                taskSubscription.unsubscribe();
            }
        };
    }, []);

    const value = {
        tasks,
        createNewTask,
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTaskContext = () => useContext(TaskContext)

export default TaskProvider