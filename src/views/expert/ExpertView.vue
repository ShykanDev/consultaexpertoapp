<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-title> <span class="font-bold text-blue-600">{{ data.name.split(' ')[0] }} {{ data.name.split(' ')[1] }}</span></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="bg-gray-50">
      <!-- Sección superior con foto y datos principales -->
      <InfoUserLoader v-if="isLoading" />
      <section v-else class="relative px-4 pt-14 pb-20 text-white bg-gradient-to-r from-blue-600 to-indigo-700">
        <div class="mx-auto max-w-6xl ion-padding">
          <div class="flex flex-col items-center md:flex-row md:items-end">
            <div class="relative -mt-16 md:mr-8">
              <img 
                :src="data.imgUrl" 
                alt="Foto de perfil" 
                class="object-cover w-32 h-32 rounded-full border-4 shadow-xl md:w-40 md:h-40 border-white/30"
              >
              <div v-if="data.isBanned || data.isSuspended" class="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <span class="flex items-center px-4 py-1 text-sm font-bold text-white bg-red-500 rounded-full">
                  <v-icon name="ri-shield-user-fill" class="mr-1" />
                  {{ data.isBanned ? 'BANEADO' : 'SUSPENDIDO' }}
                </span>
              </div>
            </div>
            
            <div class="mt-4 text-center md:mt-0 md:text-left">
              <h1 class="text-3xl font-bold">{{ data.name }}</h1>
              <p class="mb-2 text-xl text-blue-200">{{ data.specialty }}</p>
              
              <div class="flex justify-center items-center space-x-4 md:justify-start">
                <div class="flex items-center">
                  <v-icon name="io-star" class="mr-1 text-yellow-400" />
                  <span class="font-bold">{{ data.rating }}</span>
                  <span class="ml-1 text-blue-200">({{ data.totalRatings }})</span>
                </div>
                <div class="flex items-center">
                  <v-icon name="bi-briefcase" class="mr-1 text-blue-200" />
                  <span>{{ data.experienceYears }} años de experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-if="isLoading" class="flex justify-center mt-20 w-full">
        <ContentLoader />
      </section>
      <!-- Contenido principal -->
      <div v-else class="px-4 mx-auto -mt-10 max-w-6xl ion-padding">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Columna izquierda - Información básica -->
          <div class="space-y-6">
            <div class="p-6 bg-white rounded-xl shadow-sm">
              <h2 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <v-icon name="md-info" class="mr-2 text-indigo-600" />
                Información básica
              </h2>
              
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-500">Correo electrónico</p>
                  <p class="font-medium">{{ data.email }}</p>
                </div>
                
                <div>
                  <p class="text-sm text-gray-500">Cédula profesional</p>
                  <p class="font-medium">{{ data.profesionalId }}</p>
                </div>
                
                <div>
                  <p class="text-sm text-gray-500">Miembro desde</p>
                  <p class="font-medium">{{ data.formattedDate }}</p>
                </div>
              </div>
            </div>
            
            <div class="p-6 bg-white rounded-xl shadow-sm">
              <h2 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <v-icon name="md-workspaces-filled" class="mr-2 text-indigo-600" />
                Especialidades
              </h2>
              <div class="flex flex-wrap gap-2">
                <span v-for="(skill, index) in data.specialty.split(',')" :key="index" 
                      class="px-3 py-1 text-sm text-indigo-800 bg-indigo-100 rounded-full">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Columna central - Biografía -->
          <div class="space-y-6 md:col-span-2">
            <div class="p-6 bg-white rounded-xl shadow-sm">
              <h2 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <v-icon name="bi-person-lines-fill" class="mr-2 text-indigo-600" />
                Sobre mí
              </h2>
              <p class="leading-relaxed text-gray-700">
                {{ data.bio }}
              </p>
            </div>
            
            <div class="p-6 bg-white rounded-xl shadow-sm">
              <h2 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <v-icon name="bi-graph-up" class="mr-2 text-indigo-600" />
                Estadísticas
              </h2>
              
              <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div class="p-4 text-center bg-blue-50 rounded-lg">
                  <p class="text-2xl font-bold text-indigo-700">{{ data.experienceYears }}+</p>
                  <p class="text-sm text-gray-600">Años de experiencia</p>
                </div>
                
                <div class="p-4 text-center bg-blue-50 rounded-lg">
                  <p class="text-2xl font-bold text-indigo-700">{{ data.completedSessions }}</p>
                  <p class="text-sm text-gray-600">Sesiones completadas</p>
                </div>
                
                <div class="p-4 text-center bg-blue-50 rounded-lg">
                  <p class="text-2xl font-bold text-indigo-700">{{ data.successRate }}%</p>
                  <p class="text-sm text-gray-600">Tasa de éxito</p>
                </div>
              </div>
            </div>
            
            <div class="p-6 bg-white rounded-xl shadow-sm">
              <h2 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <v-icon name="bi-chat-square-text" class="mr-2 text-indigo-600" />
                Reseñas recientes
              </h2>
              <!-- Aquí irían componentes de reseñas -->
              <div class="py-8 text-center text-gray-400">
                <v-icon name="bi-chat-square-text" class="mx-auto mb-2 text-4xl" />
                <p>No hay reseñas todavía</p>
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

onMounted(() => {
    getExpertData();
  })


</script>

<style scoped>

</style>