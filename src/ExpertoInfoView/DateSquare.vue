<template>
  <div class="p-4 rounded-lg border">
    <h3 class="font-semibold">{{ dayInfo.day }}</h3>
    <p class="text-gray-500">{{ getFormattedDate() }}</p>
    
    <div class="mt-4 space-y-2">
      <button
        v-for="slot in dayInfo.slots"
        :key="slot.hour"
        @click="selectHour(slot.hour)"
        :class="[
          'w-full py-2 rounded',
          isHourSelected(slot.hour) 
            ? 'bg-blue-500 text-white' 
            : isSlotAvailable(slot)
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        ]"
      >
        {{ slot.hour }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAppointmentStore } from '@/store/appointment';

const props = defineProps({
  dayInfo: {
    type: Object,
    required: true
  }
});

const appointmentStore = useAppointmentStore();

const isSlotAvailable = (slot) => {
  return slot.takenBy === null;
};

const isHourSelected = (hour) => {
  return appointmentStore.selectedHour === hour && 
         appointmentStore.dayName === props.dayInfo.day; // Usamos dayName aquí
};

function selectHour(hour) {
  const slot = props.dayInfo.slots.find(s => s.hour === hour);
  if (slot && isSlotAvailable(slot)) {
    const formattedDate = getFormattedDate();
    appointmentStore.setAppointment(
      props.dayInfo.day, // Aquí pasamos el nombre del día
      hour,
      formattedDate
    );
  }
}

function getFormattedDate() {
  const today = new Date();
  const targetDate = new Date(today);
  const currentDay = today.getDay();
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const targetDay = days.indexOf(props.dayInfo.day);
  
  let diff = targetDay - currentDay;
  if (diff < 0) diff += 7;
  
  targetDate.setDate(today.getDate() + diff);
  
  return targetDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long'
  });
}
</script>