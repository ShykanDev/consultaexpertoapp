<template>
  <div class="transition-all duration-200 ease-in-out min-w-40">
    <article
      class="overflow-hidden mx-1 text-center bg-white rounded-xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <!-- Encabezado del día -->
      <div class="py-3 bg-gradient-to-r from-teal-500 to-blue-600">
        <p class="text-lg font-medium text-white">{{ dayInfo.day }}</p>
        <span
          class="inline-block px-3 py-1 mt-1 text-sm font-bold text-blue-800 bg-white rounded-full"
        >
          {{ dayInfo.dayNumber }}
        </span>
      </div>

      <!-- Horarios disponibles -->
      <div class="p-3 space-y-2">
        <button
          v-for="(hour, index) in availableHours"
          :key="index"
          type="button"
          @click="selectHour(hour)"
          :disabled="hoursTaken.includes(hour)"
          id="hourArea"
          class="relative px-3 py-2 w-full text-left rounded-lg border transition-all duration-200 ease-out"
          :class="{
            // Estado normal
            'border-gray-200 bg-gray-50 hover:bg-teal-50 hover:border-teal-200':
              !hoursTaken.includes(hour) &&
              !(hour === userHourSelection && dayInfo.day === userDateSelection),
            // Hora no disponible
            'border-gray-300 bg-gray-200 text-gray-400 cursor-not-allowed':
              hoursTaken.includes(hour),
            // Hora seleccionada
            'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-600 shadow-md':
              hour === userHourSelection && dayInfo.day === userDateSelection,
            // Hover para horas disponibles
            'hover:shadow-md hover:transform hover:scale-[1.02] active:scale-[.93] ':
              !hoursTaken.includes(hour),
          }"
        >
          <span
            class="font-medium"
            :class="{
              'line-through text-gray-500': hoursTaken.includes(hour),
              'text-teal-800':
                !hoursTaken.includes(hour) &&
                !(hour === userHourSelection && dayInfo.day === userDateSelection),
            }"
          >
            {{ hour }}
          </span>

          <!-- Overlay para horas no disponibles -->
          <div
            v-if="hoursTaken.includes(hour)"
            class="flex absolute inset-0 justify-center items-center bg-gray-800 bg-opacity-0 rounded-lg transition-all duration-300 pointer-events-none hover:bg-opacity-80"
          >
            <span
              class="text-xs font-medium text-white opacity-0 transition-opacity hover:opacity-100"
            >
              No Disponible
            </span>
          </div>
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps<{
  dayInfo: { day: string; dayNumber: number };
  availableForAppointment: boolean;
  availableHours: string[];
  hoursTaken: string[];
  selectedDay: string;
  selectedHour: string;
}>();

// Necesitas esto para poder emitir eventos
const emit = defineEmits<{
  (e: 'hourSelected', hour: string): void;
}>();

// Estados internos reactivos
const userDateSelection = ref(props.selectedDay);
const userHourSelection = ref(props.selectedHour);

// Mantenerlos en sync si cambian desde el padre
watch(
  () => props.selectedDay,
  (v) => {
    userDateSelection.value = v;
  }
);
watch(
  () => props.selectedHour,
  (v) => {
    userHourSelection.value = v;
  }
);

// Maneja la selección
function selectHour(hour: string) {
  if (!props.hoursTaken.includes(hour)) {
    emit('hourSelected', hour);
  }
}
</script>
