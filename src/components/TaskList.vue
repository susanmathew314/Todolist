<template>
  <ul>
    <li v-for="task in tasks" :key="task.id ?? task.title">
      <label>
        <input type="checkbox" v-model="task.completed" @change="toggleCompletion(task)" />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
      </label>
      <button v-if="task.id !== undefined" @click="deleteTask(task.id)">Delete</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Task } from '../types/Task';

export default defineComponent({
  name: 'TaskList',
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true
    }
  },
  emits: ['update-task', 'delete-task'],
  setup(_, { emit }) {
    const toggleCompletion = (task: Task) => {
      emit('update-task', { ...task, completed: !task.completed });
    };

    const deleteTask = (taskId: number | undefined) => {
      if (taskId !== undefined) {
        emit('delete-task', taskId);
      }
    };

    return { toggleCompletion, deleteTask };
  }
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
