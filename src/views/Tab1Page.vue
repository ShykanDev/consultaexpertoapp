<template>
  <ion-page class="animate-fade-right">
    <!-- Header Top Left-->
    <ion-header>
      <ion-toolbar>
        <div class="flex justify-between items-center pr-3 w-full">
          <ion-title class="text-base font-bold text-sky-700 sm:text-xl font-quicksand">
            Inicio de Sesión
          </ion-title>
          <div class="flex">
            <span v-html="currentName" :key="currentName"></span>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <!-- Eliminamos el ion-content de aquí -->
    <div class="bg-white login-page-content">
      <LoginComponent />
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import LoginComponent from '@/components/Login/LoginComponent.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';

const names = [
  [
    '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
    '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-500">.com</span>'
  ],
  [
    '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
    '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-300">.com</span>'
  ],
  [
    '<span class="animate-fade-down animate-delay-100">consulta</span>' +
    '<span class="text-sky-700 animate-fade animate-delay-200">especializada</span>' +
    '<span class="text-sky-500 animate-fade animate-delay-300">.com</span>'
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
  animateNames();
});

onIonViewDidLeave(() => {
  if(timeoutId) {
    clearInterval(timeoutId);
    timeoutId = null;
  }
});

// Limpiar el intervalo cuando el componente se desmonte
onUnmounted(() => {
  if(timeoutId) {
    clearInterval(timeoutId);
  }
});
</script>

<style scoped>
.login-page-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px;
  padding-bottom: 40px; /* Espacio para el teclado */
}

/* Asegurar que el contenido no esté detrás de la barra de estado en iOS */
ion-header {
  --ion-safe-area-top: env(safe-area-inset-top);
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 768px) {
  .login-page-content {
    padding-bottom: 30vh; /* Más espacio para el teclado en móviles */
  }
}
</style>
