<!-- src/components/TodoApp.vue -->
<template>
    <div>
      <h1>Todo List</h1>
      <TaskForm @add-task="handleTaskAdded" />
      
      <div v-if="loading">Loading tasks...</div>
      <div v-else-if="error">{{ error }}</div>
      <TaskList 
        :tasks="tasks" 
        @update-task="handleTaskUpdated" 
        @delete-task="handleTaskDeleted" 
        v-else 
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import TaskForm from './Taskform.vue';
  import TaskList from './TaskList.vue';
  import { useTasks } from '../api/useTasks';
  import { Task } from '../types/Task';
  
  export default defineComponent({
    name: 'TodoApp',
    components: { TaskForm, TaskList },
    setup() {
      const { tasks, fetchTasks, addTask, updateTask, deleteTask, loading, error } = useTasks();
  
      onMounted(() => {
        fetchTasks();
      });


      const handleTaskAdded = async (title: string) => {
      const newTask: Task = {
        title,
        completed: false, // Don't set id here, it will be assigned by the backend
        id: Date.now()
    };
        await addTask(newTask); // Ensure you're waiting for the promise to resolve
    };


      const handleTaskUpdated = (updatedTask: Task) => {
        updateTask(updatedTask);
      };
  
      const handleTaskDeleted = (taskId: number) => {
        deleteTask(taskId);
      };
  
      return { tasks, handleTaskAdded, handleTaskUpdated, handleTaskDeleted, loading, error };
    }
  });
  </script>
  