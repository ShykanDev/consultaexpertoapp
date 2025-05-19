<template>
    <div class="">
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
const db = getFirestore();
const collectionDates = collection(db, 'Dates');


const isLoading = ref(false);
const availableTimeData = ref([]);

const getDates = async () => {
  isLoading.value = true
  availableTimeData.value = [];
  try {
    const querySnapshot = await getDocs(collectionDates);
    const doc = querySnapshot.docs[0];
    if (!doc) throw new Error('No se encontró ningún documento en collectionDates');

    const data = doc.data() as any;
    console.log(data);

    if (!Array.isArray(data.weeklySchedule)) throw new Error('weeklySchedule no es un array');

    const today = new Date();
    const currentDay = today.getDay();

    const updatedSchedule = data.weeklySchedule.map((day) => {
      const date = new Date(today);
      const targetDay = day.dayInfo.day;
      const daysDiff = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].indexOf(targetDay) - currentDay;

      const daysToAdd = daysDiff >= 0 ? daysDiff : 7 + daysDiff;
      date.setDate(today.getDate() + daysToAdd);

      const month = date.toLocaleString('es-ES', { month: 'long' });

      return {
        dayInfo: {
          ...day.dayInfo,
          dayNumber: date.getDate(),
          fullDate: date.toISOString().split('T')[0],
          monthName: month
        }
      };
    });

    updatedSchedule.sort((a, b) => {
      const dateA = new Date(a.dayInfo.fullDate);
      const dateB = new Date(b.dayInfo.fullDate);
      return dateA.getTime() - dateB.getTime();
    });

    availableTimeData.value = [{ ...data, weeklySchedule: updatedSchedule }];
    //sysStore.setFirebaseData({ ...data, weeklySchedule: updatedSchedule })
    isLoading.value = false

    console.log(availableTimeData.value);
    
  } catch (error) {
    console.error('Error fetching dates:', error);
    isLoading.value = false
  }
}
</script>

<style scoped>

</style>