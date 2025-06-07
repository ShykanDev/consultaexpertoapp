<template>
    <div class="p-6 w-full max-w-full bg-white rounded-3xl border border-gray-200 shadow-lg">
      <!-- Título de la cita -->
      <div class="mb-6 text-center">
        <div class="inline-flex justify-center items-center mx-auto mb-3 w-16 h-16 bg-blue-100 rounded-full">
          <v-icon name="fa-calendar-check" class="text-2xl text-blue-600" />
        </div>
        <h3 class="mb-1 text-lg font-semibold text-gray-800">Cita agendada</h3>
        <p class="font-medium text-gray-600">
          Para el <span class="text-blue-600">{{ day }} {{ formattedDate }}</span>
        </p>
        <p class="font-medium text-gray-600">
          A las <span class="text-blue-600">{{ hour }}</span> con 
          <span class="text-blue-600">{{ expertName }}</span>
        </p>
      </div>
      
      <div class="pt-4 space-y-4 border-t border-gray-100">
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="bi-calendar2-minus" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Día:</span>
          <span class="ml-1 font-bold text-blue-600">{{ day + ' ' + formattedDate }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="bi-alarm" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Hora:</span>
          <span class="ml-1 font-bold text-blue-600">{{ hour }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-user-md" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Nombre:</span>
          <span class="ml-1 font-bold text-blue-600">{{ expertName }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-briefcase-medical" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Especialidad:</span>
          <span class="ml-1 font-bold text-blue-600">{{ specialty }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-id-card" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Cédula profesional:</span>
          <span class="ml-1 font-bold text-blue-600">{{ professionalId }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-link" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Enlace de la cita:</span>
          <span class="ml-1 italic font-mediums text-slate-500">{{ (appointmentLink !== '') ? appointmentLink : 'El enlace de la cita estará generado una vez el administrador lo asigne' }}</span>
        </div>
      </div>

      <div class="p-3 mt-4 bg-yellow-50 rounded-lg border border-gray-200">
        <div class="flex items-start">
          <div class="w-full">
            <p class="text-sm text-gray-600">
              <span class="font-medium">Registrado el:</span>
              <span class="ml-1 font-semibold text-blue-600">
                {{ new Date(createdAt.seconds * 1000).toLocaleDateString('es-MX', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </span>
            </p>
            <p class="flex gap-2 items-center mt-1 text-xs text-yellow-600">
              <v-icon name="bi-info-circle" class="text-yellow-600" />
              Esta es la fecha en que se registró su cita, no la fecha de su consulta.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps<{
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
    formattedDate: string;
    userId: string;
    expertUid: string;
    day: string;
    hour: string;
    expertName: string;
    specialty: string;
    professionalId: string;
    appointmentLink: string | null;
  }>();
  </script>