<template>
    <ion-content class="w-full bg-gradient-to-br from-indigo-50 to-blue-50 ion-padding">
      <form @submit.prevent="" class="mx-auto space-y-6 max-w-2xl">
        <!-- Título -->
        <div class="mb-8 text-center">
          <h1 class="mb-2 text-3xl font-bold text-orange-700">Unase a nosotros</h1>
          <p class="text-gray-500">Crea tu cuenta en segundos</p>
        </div>
  
        <!-- Nombre Completo -->
        <div class="form-group">
          <label class="form-label">Nombre completo</label>
          <ion-input
            v-model="formData.fullName"
            type="text"
            placeholder="Ej. María González"
            class="!pl-11 form-input"
          >
            <v-icon name="ri-user-2-fill" class="absolute left-3 top-1/2 text-xl text-gray-400 -translate-y-1/2" />
          </ion-input>
        </div>
  
        <!-- Email -->
        <div class="form-group">
          <label class="form-label">Correo electrónico</label>
          <ion-input
            v-model="formData.email"
            type="email"
            placeholder="tucorreo@example.com"
            class="!pl-11 form-input"
          >
            <v-icon name="md-email" class="absolute left-3 top-1/2 text-xl text-gray-400 -translate-y-1/2" />
          </ion-input>
          <div v-if="errors.email" class="form-error">
            <v-icon name="ri-alert-fill" class="mr-2 text-red-500" />
            {{ errors.email }}
          </div>
        </div>
  
        <!-- Contraseña -->
        <div class="form-group">
          <label class="form-label">Contraseña</label>
          <div class="flex justify-center items-center">
            <ion-input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="pr-11 form-input"
            >
            <v-icon name="md-password-round" class="text-xl text-gray-400" />
          </ion-input>
        </div>
        </div>
  
        <!-- Confirmar Contraseña -->
        <div class="form-group">
          <label class="form-label">Confirmar Contraseña</label>
          <ion-input
            v-model="formData.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="pr-11 form-input"
          >
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 text-gray-400 -translate-y-1/2 hover:text-indigo-600"
            >
              <v-icon name="md-password-round" class="text-xl" />
            </button>
          </ion-input>
          <div v-if="errors.password" class="form-error">
            <v-icon name="ri-alert-fill" class="mr-2 text-red-500" />
            {{ errors.password }}
          </div>
        </div>
  

        <VueDatePicker v-model="date" auto-apply partial-flow :enable-time-picker="false"
        :flow="['month', 'year', 'calendar']" />

        <p v-if="isMinor" class="mt-2 text-red-500">
          <v-icon name="ri-alert-fill" class="mr-2 text-red-500" />
          Debe ser mayor de edad para registrarse
        </p>

        <!-- Términos -->
        <div class="form-group">
          <label class="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg">
            <ion-checkbox
              v-model:checked="formData.acceptedTerms"
              class="mt-0.5 shrink-0 checkbox-custom"
            ></ion-checkbox>
            <span class="text-sm leading-tight text-gray-600">
              Acepto los 
              <a href="#" class="font-medium text-indigo-600 hover:underline">términos de servicio</a> 
              y la 
              <a href="#" class="font-medium text-indigo-600 hover:underline">política de privacidad</a>
            </span>
          </label>
        </div>
  
        <ion-button
          type="submit"
          expand="block"
          class="submit-button group"
        >
          <span class="flex gap-2 items-center">
            Crear cuenta
            <v-icon name="ri-arrow-right-line" class="transition-transform group-hover:translate-x-1" />
          </span>
        </ion-button>
  
        <p class="mt-8 text-sm text-center text-gray-500">
          ¿Ya tienes cuenta? 
          <a href="#" class="font-semibold text-indigo-600 hover:underline">Ingresa aquí</a>
        </p>
      </form>
    </ion-content>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import {
    IonContent,
    IonInput,
    IonCheckbox,
    IonButton
  } from '@ionic/vue';

  import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


  // Lógica del formulario
  const formData = reactive({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });
  
  const errors = reactive({
    email: '',
    password: '',
  });
  
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const date = ref(new Date());

  const isMinor = ref(false)
//Función para verificar si es menor de edad (18 años)
const checkIfMinor = () => {
  if (!date.value) {
    console.log("No se ha seleccionado fecha");
    return;
  }

  const birthDate = new Date(date.value);
  const today = new Date();

  // Calculamos la edad restando los años
  let age = today.getFullYear() - birthDate.getFullYear();

  // Ajustamos si aún no ha pasado el cumpleaños este año
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  isMinor.value = age < 18;
  console.log(`Edad calculada: ${age} años - ${isMinor.value ? "Es menor de edad" : "Es mayor de edad"}`);

  return isMinor.value;
};

watch(date, () => {
  checkIfMinor();
});
  </script>
  
  <style scoped>
  .form-group {
    @apply space-y-2;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700;
  }
  
  .form-input {
    --padding-start: 44px;
    --padding-end: 44px;
    --border-radius: 10px;
    --background: white;
    --border-color: #e2e8f0;
    --height: 52px;
    @apply shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300;
  }
  
  .form-error {
    @apply flex items-center text-sm text-red-600 mt-2 px-3 py-2 bg-red-50 rounded-lg;
  }
  
  .checkbox-custom {
    --size: 20px;
    --checkbox-background-checked: #4f46e5;
    --border-color-checked: #4f46e5;
    --border-radius: 6px;
  }
  
  .submit-button {
    --background: #4f46e5;
    --border-radius: 10px;
    --box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
    --padding-top: 16px;
    --padding-bottom: 16px;
    @apply font-semibold text-base transition-all hover:bg-indigo-600 active:bg-indigo-700;
  }
  </style>