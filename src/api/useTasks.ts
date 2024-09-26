import { ref } from 'vue';
import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://localhost:3000/tasks';

export function useTasks() {
  const tasks = ref<Task[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<Task[]>(API_URL);
      tasks.value = response.data;
    } catch (err) {
      error.value = 'Failed to load tasks';
    } finally {
      loading.value = false;
    }
  };

  // Add a new task
  const addTask = async (newTask: Task) => {
    try {
      const response = await axios.post<Task>(API_URL, newTask);
      tasks.value = [...tasks.value, response.data]; // Create a new array with the added task
    } catch (err) {
      error.value = 'Failed to add task';
    }
  };

  // Update an existing task
  const updateTask = async (task: Task) => {
    console.log('Updating task:', task); 
    if (!task.id) {
      console.error('Task ID is missing'); 
      error.value = 'Task ID is missing';
      return;
    }
  
    try {
      const response = await axios.put(`${API_URL}/${task.id}`, task);
      console.log('Task updated successfully:', response.data);
    } catch (err) {
      console.error('Error updating task:', err); 
      error.value = 'Failed to update task';
    }
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      tasks.value = tasks.value.filter(task => task.id !== taskId); // Remove the task from the array
    } catch (err) {
      error.value = 'Failed to delete task';
    }
  };

  return { tasks, fetchTasks, addTask, updateTask, deleteTask, loading, error };
}
