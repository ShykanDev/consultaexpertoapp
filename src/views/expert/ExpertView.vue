<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Expert View</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <section class="flex justify-center items-center p-1 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 md:p-8">
    <div class="flex overflow-hidden flex-col w-full max-w-6xl bg-white rounded-2xl shadow-xl md:flex-row">
      <!-- Columna izquierda (Información principal) -->
      <div class="flex flex-col items-center p-8 text-white bg-gradient-to-b from-blue-600 to-indigo-700 md:w-1/3">
        <div class="relative mb-6">
          <img 
            :src="data.imgUrl" 
            alt="Foto de perfil" 
            class="object-cover w-48 h-48 rounded-full border-4 shadow-lg border-white/30"
          >
          <div v-if="data.isBanned || data.isSuspended" class="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <span class="flex items-center px-4 py-1 text-sm font-bold text-white bg-red-500 rounded-full">
              <v-icon name="ri-shield-user-fill" class="mr-1" />
              {{ data.isBanned ? 'BANEADO' : 'SUSPENDIDO' }}
            </span>
          </div>
        </div>

        <h1 class="mb-2 text-3xl font-bold text-center">{{ data.name }}</h1>
        <p class="mb-6 text-xl text-blue-200">{{ data.specialty }}</p>
        
        <div class="p-6 mb-6 w-full rounded-xl backdrop-blur-sm bg-white/10">
          <div class="flex items-center mb-4">
            <v-icon name="io-star" class="mr-2 text-2xl text-yellow-400" />
            <div>
              <p class="text-2xl font-bold">{{ data.rating }}</p>
              <p class="text-sm text-blue-200">{{ data.totalRatings }} valoraciones</p>
            </div>
          </div>
          
          <div class="flex justify-between">
            <div class="text-center">
              <p class="text-2xl font-bold">{{ data.experienceYears }}+</p>
              <p class="text-sm text-blue-200">Años exp</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold">{{ data.completedSessions }}</p>
              <p class="text-sm text-blue-200">Sesiones</p>
            </div>
          </div>
        </div>
        
        <div class="flex pt-4 mt-auto space-x-4">
          <button class="px-6 py-3 font-semibold text-blue-700 bg-white rounded-full shadow-md transition hover:bg-blue-50">
            Contactar
          </button>
        </div>
      </div>

      <!-- Columna derecha (Detalles) -->
      <div class="p-8 md:w-2/3">
        <div class="mb-8">
          <h2 class="flex items-center mb-4 text-2xl font-bold text-gray-800">
            <v-icon name="md-workspaces-filled" class="mr-2 text-indigo-600" />
            Especialización
          </h2>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 text-sm text-indigo-800 bg-indigo-100 rounded-full">
              Estrategia Digital
            </span>
            <span class="px-3 py-1 text-sm text-indigo-800 bg-indigo-100 rounded-full">
              Análisis de Mercado
            </span>
            <span class="px-3 py-1 text-sm text-indigo-800 bg-indigo-100 rounded-full">
              Branding
            </span>
          </div>
        </div>
        
        <div class="mb-8">
          <h2 class="flex items-center mb-4 text-2xl font-bold text-gray-800">
            <v-icon name="fa-envelope" class="mr-2 text-indigo-600" />
            Contacto
          </h2>
          <div class="flex items-center p-4 bg-gray-100 rounded-lg">
            <div class="p-2 mr-3 bg-indigo-100 rounded-full">
              <v-icon name="fa-envelope" class="text-indigo-700" />
            </div>
            <div>
              <p class="font-semibold">Email profesional</p>
              <p class="text-gray-600">{{ data.email }}</p>
            </div>
          </div>
        </div>
        
        <div class="mb-8">
          <h2 class="flex items-center mb-4 text-2xl font-bold text-gray-800">
            <v-icon name="bi-calendar-check" class="mr-2 text-indigo-600" />
            Biografía
          </h2>
          <p class="p-4 leading-relaxed text-gray-700 bg-gray-50 rounded-lg border border-gray-200">
            {{ data.bio }}
          </p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-gray-600">Cédula profesional</p>
            <p class="font-bold">{{ data.profesionalId }}</p>
          </div>
          <div class="p-4 bg-blue-50 rounded-lg">
            <p class="text-sm text-gray-600">Miembro desde</p>
            <p class="font-bold">{{ data.formattedDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { reactive, ref } from 'vue';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { onMounted } from 'vue';
import { authStore } from '@/store/auth';
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
        } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getExpertData();
})

const props = defineProps({
    professionalId:{
        type: String,
        required: true
    }
})
</script>

<style scoped>

</style>