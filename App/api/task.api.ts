import React, { createContext, useContext, } from 'react'
import { AppState, Platform } from 'react-native'
import { supabase } from './supabase.module'
import { Task } from '@App/models';


const loadTasks = async () =>
    await supabase
            .from('tasks')
            .select()

const createNewTask = async (task: Task)=>
    await supabase
            .from('tasks')
            .insert([task]);

const updateTask = async (task: Task) =>
    await supabase
            .from('tasks')
            .update(task)
            .eq('id', task.id);
                
const deleteTask = async (taskId: number) => 
    await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

export type TaskAPI = {
    loadTasks: () => void
    createNewTask: (task: Task) => void
    updateTask: (task: Task) => void
    deleteTask: (taskId: number) => void
}

export default {
    loadTasks,
    createNewTask,
    updateTask,
    deleteTask,
}