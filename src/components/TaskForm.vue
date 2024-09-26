<!-- src/components/TaskForm.vue -->
<template>
    <form @submit.prevent="onSubmit">
      <input 
        v-model="taskTitle" 
        type="text" 
        placeholder="Add a new task" 
        required
      />
      <button type="submit">Add Task</button>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'TaskForm',
    emits: ['add-task'], // Emitting event to add a task
    setup(_, { emit }) {
      const taskTitle = ref(''); // Track task title input
  
      // Handle form submission
      const onSubmit = () => {
        if (taskTitle.value.trim()) {
          emit('add-task', taskTitle.value.trim()); // Emit the task title to the parent
          taskTitle.value = ''; // Clear input after task is added
        }
      };
  
      return { taskTitle, onSubmit };
    }
  });
  </script>
  
  <style scoped>
  form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
  }
  button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  