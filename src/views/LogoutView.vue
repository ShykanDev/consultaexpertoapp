<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar class="flex w-full bg-gradient-to-r from-indigo-500 to-purple-600">
          <div class="flex items-center px-2">
          <article @click="router.back()"  class="flex items-center cursor-pointer">
            <span class="flex items-center py-1 font-semibold text-sky-600 font-quicksand">
              <v-icon name="md-arrowbackiosnew-round" class="animate-fade-left" /> 
              <span class="text-base animate-fade-left animate-delay-100">atras</span>
            </span>
          </article>
          
          <div class="flex justify-between items-center pr-3 w-full">
          <ion-title class="text-base font-bold text-blue-500 sm:text-xl font-quicksand">Mi Cuenta</ion-title>
          <div class="flex">
            <span v-html="currentName" :key="currentName"></span>
          </div>
        </div>
        </div>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="bg-gray-50 ion-padding">
        <!-- Sección de perfil -->
        <div class="flex flex-col items-center my-6">
          <div class="flex justify-center items-center mb-4 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full shadow-lg">
            <span class="text-2xl font-bold text-white">{{}}</span>
          </div>
          <h2 class="mb-1 text-xl font-bold text-gray-800">{{ authStorePinia().getUserName }}</h2>
          <p class="text-sm text-gray-500">{{ authStorePinia().getUserEmail }}</p>
        </div>
  
        <!-- Logout -->
        <div @click="handleLogout" class="p-4 mb-6 bg-white rounded-xl border border-rose-200 shadow-sm hover:border-rose-500 hover:cursor-pointer active:bg-rose-500 active:text-white active:scale-[.98] transition-all duration-[30ms]">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <ion-icon :icon="logOutOutline" class="mr-3 text-xl text-red-500"></ion-icon>
              <div>
                <div class="font-medium text-gray-800">Cerrar sesión</div>
                <p class="mt-1 text-xs text-gray-500">Salir de tu cuenta actual</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Recuperar contraseña -->
        <div class="p-5 space-y-4 bg-white rounded-xl shadow-sm">
          <div class="text-center">
            <div class="flex justify-center items-center mx-auto mb-3 w-12 h-12 bg-indigo-100 rounded-full">
              <ion-icon :icon="keyOutline" class="text-xl text-indigo-500"></ion-icon>
            </div>
            <h2 class="text-lg font-bold text-gray-800">Recuperar contraseña</h2>
            <p class="mt-1 text-sm text-gray-600">Ingresa tu correo para recibir un enlace</p>
          </div>
  
          <ion-item lines="none" class="bg-gray-50 rounded-lg">
            <ion-icon :icon="mailOutline" slot="start" class="text-gray-400"></ion-icon>

      <ion-input v-model="email" label="Correo electrónico" label-placement="floating" placeholder="Enter text"></ion-input>
          </ion-item>
  
          <ion-button 
            expand="block" 
            shape="round" 
            color="primary" 
            @click="handlePasswordReset"
            class="font-medium"
          >
            Enviar correo de recuperación
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonInput, 
    IonItem, 
    IonLabel,
    IonIcon,
    onIonViewDidLeave,
    onIonViewDidEnter
    
  } from '@ionic/vue';
  import { 
    logOutOutline, 
    mailOutline, 
    keyOutline 
  } from 'ionicons/icons';
  

 
  import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { authStore as authStorePinia } from '@/store/auth';
import { getAuth } from 'firebase/auth';
  const router = useRouter();
  const authStore = authStorePinia();
  const email = ref('');
  const isLoading = ref(false);
  const errorMessage = ref('');

  const auth = getAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      authStore.setLogout();
      window.location.reload();
      router.push('/tabs/tab1');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      errorMessage.value = 'Ocurrió un error al cerrar sesión';
    }
  };
  
  const handlePasswordReset = async () => {
    if (!email.value) {
      errorMessage.value = 'Por favor ingresa tu correo electrónico';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errorMessage.value = 'Por favor ingresa un correo electrónico válido';
      return;
    }

    try {
      isLoading.value = true;
      errorMessage.value = '';
      await sendPasswordResetEmail(auth, email.value);
      // Mostrar mensaje de éxito
      alert('Se ha enviado un correo para restablecer tu contraseña. Por favor revisa tu bandeja de entrada.');
      email.value = '';
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      errorMessage.value = 'Error al enviar el correo de recuperación. Intenta de nuevo más tarde.';
    } finally {
      isLoading.value = false;
    }
  };

  const names = [
  [
    '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-cyan-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
    '<span class="text-cyan-500 animate-fade animate-duration-300 animate-delay-500">.com</span>'
  ],
  [
    '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-cyan-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
    '<span class="text-cyan-500 animate-fade animate-duration-300 animate-delay-300">.com</span>'
  ],
  [
    '<span class="animate-fade-down animate-delay-100">consulta</span>' +
    '<span class="text-cyan-700 animate-fade animate-delay-200">especializada</span>' +
    '<span class="text-cyan-500 animate-fade animate-delay-300">.com</span>'
  ]
];

let timeoutId: NodeJS.Timeout | null = null;
const currentName = ref<string[]>(names[0]);
 const animateNames = () => {
  timeoutId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    currentName.value = names[randomIndex];
  }, 2000);
  
 }

 onIonViewDidEnter(() => {
  if(timeoutId){
    clearInterval(timeoutId);
    timeoutId = null;
  }
  animateNames();
})

onIonViewDidLeave(() => {
  if(timeoutId){
    clearInterval(timeoutId);
    timeoutId = null;
  }
})
  </script>
  
  <style scoped>
  /* Estilos específicos para los inputs */
  :deep(.input-focus) {
    --highlight-color-focused: #6366f1;
    --border-color: #e2e8f0;
    --border-radius: 12px;
    --padding-start: 8px;
    --padding-end: 8px;
  }
  
  :deep(.input-focus.ion-focused) {
    --border-color: #a5b4fc;
    --box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
  
  /* Asegurar que el ion-content ocupe todo el espacio */
  ion-content {
    --background: #f9fafb;
  }
  
  /* Estilos para el ion-item */
  ion-item {
    --background: #f8fafc;
    --border-radius: 12px;
    --padding-start: 12px;
    --padding-end: 12px;
    margin-bottom: 16px;
  }
  
  /* Estilos para el botón de envío */
  ion-button {
    --border-radius: 12px;
    --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --padding-top: 16px;
    --padding-bottom: 16px;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }
  
  /* Ajustes para el icono dentro del botón */
  ion-button ion-icon {
    margin-right: 8px;
  }
  </style>