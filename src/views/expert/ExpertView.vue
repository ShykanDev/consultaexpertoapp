<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-title> <span class="font-bold text-blue-600">{{ data.name.split(' ')[0] }} {{ data.name.split(' ')[1] }}</span></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="bg-gray-50">
      <InfoUserLoader v-if="isLoading" />

<!-- Sección superior con foto y datos principales -->
<section v-else class="px-4 py-12 text-white bg-gradient-to-br from-sky-300 to-blue-600">
  <div class="container mx-auto">
    <div class="flex flex-col items-center md:flex-row">
      <div class="flex justify-center w-full md:w-1/3 md:justify-start">
        <div class="relative">
          <img
            :src="data.imgUrl"
            alt="Foto de perfil"
            class="object-cover w-48 h-48 rounded-full border-4 border-white shadow-lg"
          >
          <div v-if="data.isBanned || data.isSuspended" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <span class="flex items-center px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-full">
              <v-icon name="ri-shield-user-fill" class="mr-1" />
              {{ data.isBanned ? 'BANEADO' : 'SUSPENDIDO' }}
            </span>
          </div>
        </div>
      </div>
      <div class="mt-6 w-full text-center md:w-2/3 md:pl-12 md:mt-0 md:text-left">
        <h1 class="text-5xl font-bold">{{ data.name }}</h1>
        <p class="mt-2 text-2xl text-purple-200">{{ data.specialty }}</p>
        <div class="flex flex-col justify-center items-center mt-6 space-y-4 sm:flex-row md:justify-start sm:space-y-0 sm:space-x-8">
          <div class="flex items-center">
            <v-icon name="io-star" class="mr-2 text-yellow-300" />
            <span class="text-xl font-bold">{{ data.rating }}</span>
            <span class="ml-1 text-purple-200">({{ data.totalRatings }})</span>
          </div>
          <div class="flex items-center">
            <v-icon name="bi-briefcase" class="mr-2 text-purple-200" />
            <span>{{ data.experienceYears }} años de experiencia</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Contenido principal -->
<div class="container px-4 py-12 mx-auto">
  <div class="hidden flex-col -mx-4 lg:flex-row">
    <!-- Columna izquierda -->


    <!-- Columna central -->
    <div class="px-4 lg:w-2/3">

      <!--Expert Dates section-->
      <section>

      </section>
      <div class="p-4 mb-6 bg-white rounded-2xl shadow-md">
  <h2 class="flex items-center mb-4 text-xl font-bold text-gray-800">
    <v-icon name="bi-graph-up" class="mr-2 text-indigo-600" />
    Estadísticas
  </h2>
  <div class="grid grid-cols-1 gap-4">
    <!-- Tarjeta de Años de Experiencia -->
    <div class="p-4 text-center bg-indigo-50 rounded-xl">
      <div class="flex justify-center">
        <div class="flex justify-center items-center mb-2 w-12 h-12 bg-indigo-200 rounded-full">
          <p class="text-xl font-bold text-indigo-800">{{ data.experienceYears }}+</p>
        </div>
      </div>
      <p class="mt-2 text-sm font-medium text-gray-600">Años de experiencia</p>
    </div>

    <!-- Tarjeta de Sesiones Completadas -->
    <div class="p-4 text-center bg-indigo-50 rounded-xl">
      <div class="flex justify-center">
        <div class="flex justify-center items-center mb-2 w-12 h-12 bg-indigo-200 rounded-full">
          <p class="text-xl font-bold text-indigo-800">{{ data.completedSessions }}</p>
        </div>
      </div>
      <p class="mt-2 text-sm font-medium text-gray-600">Sesiones completadas</p>
    </div>

    <!-- Tarjeta de Reseñas -->
    <div class="p-4 text-center bg-indigo-50 rounded-xl">
      <div class="flex justify-center">
        <div class="flex justify-center items-center mb-2 w-12 h-12 bg-indigo-200 rounded-full">
          <p class="text-xl font-bold text-indigo-800">{{ data.rating }}</p>
        </div>
      </div>
      <div class="flex justify-center mt-1">
        <v-icon name="io-star" class="text-indigo-600" />
      </div>
      <p class="mt-2 text-sm font-medium text-gray-600">({{ data.totalRatings }} reseñas)</p>
    </div>
  </div>
</div>


 

      <div class="p-8 mt-6 bg-white rounded-2xl shadow-xl">
        <h2 class="flex items-center mb-6 text-2xl font-bold text-gray-800">
          <v-icon name="bi-chat-square-text" class="mr-3 text-indigo-600" />
          Reseñas recientes
        </h2>
        <div class="py-12 text-center text-gray-400">
          <v-icon name="bi-chat-square-text" class="mx-auto mb-4 text-5xl" />
          <p class="text-xl">No hay reseñas todavía</p>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 min-h-screen bg-blue-50">
    <!-- Estado general -->
    <div class="p-4 mx-auto mb-6 max-w-md bg-white rounded-lg border border-blue-100 shadow-sm">
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-blue-800">Disponibilidad</h1>
        <span class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
          :class="expertSchedule?.availableForAppointment 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'">
          {{ expertSchedule?.availableForAppointment ? 'Disponible' : 'No disponible' }}
        </span>
      </div>
    </div>

    <!-- Horarios por día -->
    <div class="mx-auto space-y-4 max-w-md">
      <div v-for="day in expertSchedule?.days" :key="day.day" 
           class="overflow-hidden bg-white rounded-lg border border-blue-100 shadow-sm">
        
        <!-- Encabezado del día -->
        <div class="flex justify-between items-center px-4 py-3 bg-blue-700">
          <h2 class="font-medium text-white">{{ day.day }}</h2>
          <span v-if="day.availableDay" class="text-xs text-blue-200">
            {{ day.slots.length }} horarios
          </span>
        </div>

        <!-- Slots -->
        <div v-if="day.availableDay" class="grid gap-2 p-3">
          <div v-for="slot in day.slots" :key="slot.hour"
               class="flex justify-between items-center px-3 py-2 rounded-md border"
               :class="{
                 'border-green-300 bg-green-50': slot.takenBy === null,
                 'border-blue-300 bg-blue-50': slot.takenBy === 'ID_DEL_USUARIO',
                 'border-blue-400 bg-blue-50': slot.takenBy && slot.takenBy !== 'ID_DEL_USUARIO'
               }">
            <span class="font-medium text-blue-900">{{ slot.hour }}</span>
            <span class="px-2 py-1 text-xs rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': slot.takenBy === null,
                    'bg-blue-100 text-blue-800': slot.takenBy === 'ID_DEL_USUARIO',
                    'bg-gray-100 text-gray-800': slot.takenBy && slot.takenBy !== 'ID_DEL_USUARIO'
                  }">
              {{ 
                slot.takenBy === null ? 'Disponible' :
                slot.takenBy === 'ID_DEL_USUARIO' ? 'Ocupado' : 'Ocupado'
              }}
            </span>
            <button v-if="slot.takenBy !== null" class="px-4 py-2 text-white bg-blue-600 rounded-full">Confirmar</button>
          </div>
        </div>

        <!-- Día no disponible -->
        <div v-else class="p-4 text-center text-gray-500 bg-blue-50">
          No hay disponibilidad este día
        </div>
      </div>
    </div>
  </div>
</div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { reactive, ref } from 'vue';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { onMounted } from 'vue';
import { authStore } from '@/store/auth';
import InfoUserLoader from '@/animations/InfoUserLoader.vue';
import ContentLoader from '@/animations/ContentLoader.vue';
const isLoading = ref(true);
const data = reactive({
    name: '',
    specialty: '',
    rating: 0,
    totalRatings: 0,
    bio: '',
    experienceYears: 0,
    completedSessions: 0,
    profesionalId: '',
    email: '',
    isBanned: false,
    isSuspended: false,
    suspensionReason: '',
    formattedDate: '',
    imgUrl: ''
})
//Firebase stuff
const db = getFirestore();
const expertMockCollection = collection(db, 'MockExperts');
const expertData = ref();
const getExpertData = async () => {
    try {
        const qGetExpertMatch = query(expertMockCollection, where('email', '==', authStore().getUserEmail));
        const expertMockSnapshot = await getDocs(qGetExpertMatch);
        expertData.value = expertMockSnapshot.docs[0].data();
        data.name = expertData.value.name;
        data.specialty = expertData.value.specialty;
        data.rating = expertData.value.rating;
        data.totalRatings = expertData.value.totalRatings;
        data.bio = expertData.value.bio;
        data.experienceYears = expertData.value.experienceYears;
        data.completedSessions = expertData.value.completedSessions;
        data.profesionalId = expertData.value.profesionalId;
        data.email = expertData.value.email;
        data.isBanned = expertData.value.isBanned;
        data.isSuspended = expertData.value.isSuspended;
        data.suspensionReason = expertData.value.suspensionReason;
        data.formattedDate = expertData.value.createdAt.toDate().toLocaleDateString();
        data.imgUrl = expertData.value.imgUrl;
        isLoading.value = false;
        } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}


  interface ScheduleSlot {
  hour: string;
  takenBy: string | null;
}

interface DaySchedule {
  day: string;
  slots: ScheduleSlot[];
  availableDay: boolean;
}

interface DayInfo {
  day: string;
  dayNumber: number;
  monthName: string;
  fullDate: string;
  isDayAvailable: boolean;
  availableHours: string[];
  hoursTaken: string[];
}

interface WeeklyScheduleItem {
  dayInfo: DayInfo;
}

interface ExpertSchedule {
  userUid: string;
  availableForAppointment: boolean;
  days: DaySchedule[];
  weeklySchedule: WeeklyScheduleItem[];
}

const expertSchedule = ref<ExpertSchedule | null>(null);

const expertScheduleCollection = collection(db, `MockExperts/7A5Q6oAtYu1yD22VRtbL/Schedule`); //This on production should get the user UID in this case for testing it's set to based on the query to get the user id (manually set before, so thats we can not use )

const getExpertSchedule = async () => {
    try {
        const qGetExpertSchedule = query(expertScheduleCollection, where('userUid', '!=', '7A5Q6oAtYu1yD22L'));
        const expertMockSnapshot = await getDocs(qGetExpertSchedule);
        if (expertMockSnapshot.empty) {
            console.log('No se encontró el horario del experto');
            return;
        }
        expertSchedule.value = expertMockSnapshot.docs[0].data() as ExpertSchedule;
        console.log(expertMockSnapshot.docs[0].data());
        
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    getExpertData();
    getExpertSchedule();
    console.log(authStore().getUserUid);
    
})


</script>

<style scoped>

</style>