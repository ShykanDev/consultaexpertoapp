<template>
    <div class="flex overflow-hidden flex-col bg-white rounded-2xl shadow-md card md:flex-row">
      <img :src="image" :alt="title" class="object-cover md:w-1/3">
      <div class="p-6 md:w-2/3">
        <h3 class="mb-2 text-2xl font-semibold text-emerald-600 font-inter">{{ title }}</h3>
        <p class="mb-4 text-gray-600 font-inter">{{ description }}</p>
        <button class="px-4 py-2 font-medium text-white bg-emerald-400 rounded-lg hover:bg-emerald-600 font-inter">
          Consultar
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>

  </style>
  