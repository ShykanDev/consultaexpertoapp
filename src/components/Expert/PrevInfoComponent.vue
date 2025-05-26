<template>
    <div class="box-border p-2 m-4 w-[95%] bg-emerald-50 rounded-lg border border-sky-700 shadow-xl sm:w-auto">
      <div class="flex flex-row flex-wrap items-center p-4 bg-white rounded-lg">
        <!-- Circular Profile Image -->
        <div class="mr-4">
          <img
            v-if="expertImage !== ''"
            :src="expertImage"
            alt="Expert Profile"
            class="object-cover w-24 h-24 rounded-full"
          />
          <v-icon v-else name="la-user-tie-solid" scale="2" />
        </div>
 
        <!-- Expert Details -->
        <div class="flex flex-col">
          <!-- Expert Name -->
          <h2 class="pb-2 text-xl font-bold text-gray-800 border-b border-sky-600">{{ expertName || 'Unknown Expert' }}</h2>
          {{ sysStore.getSelectedExpertUid  ?? 'No expert selected'}}
          <!-- Expert Specialty -->
          <p class="mb-2 text-sm text-gray-600">{{ expertSpecialty || 'Specialty' }}</p>
  
          <!-- Brief Description -->
          <p class="mb-4 text-gray-700">{{ expertSummary || 'No description available.' }}</p>
  
          <!-- Rating -->
          <div class="flex items-center mb-4">
            <span v-for="star in 5" :key="star" class="text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </span>
            <span class="ml-2 text-gray-700">{{ expertRating || 0 }}/5</span>
          </div>
        </div>
  
        <!-- Button to view availability -->
        <button
          @click="viewSchedule"
          class="px-4 py-2 ml-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Ver Disponibilidad
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import { useRouter } from 'vue-router';
import systemStore from '@/store/system';

const sysStore = systemStore();

  const props = defineProps({
    expertName: {
      type: String,
      default: 'Unknown Expert'
    },
    expertUid: {
      type: String,
      default: ''
    },
    expertImage: {
      type: String,
      default: ''
    },
    expertSummary: {
      type: String,
      default: 'No description available.'
    },
    expertSpecialty: {
      type: String,
      default: 'Specialty'
    },
    expertRating: {
      type: Number,
      default: 5
    }
  });
  
  // ion routing to expert schedule view
  const router = useRouter();
  const viewSchedule = () => {
    //Add the expert UID to the system store (this value will be used to get the expert schedule from Firebase in the ExpertInfoView)
    sysStore.setSelectedExpertUid(props.expertUid);
    router.push('/expert-info');
  };
  </script>
  
  <style scoped>
  /* Add any additional custom styles here */
  </style>
  