<template>
 <ion-page>
  <ion-content>
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-header>
      <ion-toolbar>
        <div class="flex items-center px-2">
          <article @click="router.back()"  class="flex items-center cursor-pointer">
            <span class="flex items-center py-1 font-semibold text-sky-600 font-quicksand">
              <v-icon name="md-arrowbackiosnew-round" class="animate-fade-left" /> 
              <span class="text-base animate-fade-left animate-delay-100">atras</span>
            </span>
          </article>
          
          <div class="flex justify-between items-center pr-3 w-full">
          <ion-title class="text-base font-bold text-blue-500 sm:text-xl font-quicksand">Agendar Cita</ion-title>
          <div class="flex animate animate-fade animate-delay-[3000ms]">
            <span v-html="currentName" :key="currentName"></span>
          </div>
        </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <section v-if="isLoading" class="flex fixed right-0 bottom-0 left-0 top-14 z-50 justify-center items-center bg-black/45"> <!-- Loader -->
      <LoaderBlue  />
    </section>
    <section>
    </section>
      <!-- Sección principal mejorada -->

<!--Section about expert-->
 <!-- Sección superior con foto y datos principales -->
 <InfoUserLoader v-if="isLoadingExpertInfo" />
      <section v-else class="relative px-4 pt-14 pb-20 text-white bg-gradient-to-r from-blue-600 to-sky-700">
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
              <div class="text-3xl font-bold animate-fade-up animate-delay-100">
                {{ data.name }}
              </div>
              <p class="mb-2 text-xl text-blue-200 animate-fade-up animate-delay-300">{{ data.specialty }}</p>
              
              <div class="flex justify-center items-center space-x-4 md:justify-start animate-fade-up animate-delay-500">
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
      <section v-if="isLoadingExpertInfo" class="flex justify-center mt-20 w-full">
        <ContentLoader />
      </section>
      <!-- Contenido principal -->
      <div v-else class="px-2 mx-auto -mt-6 max-w-6xl ion-padding">
  <div class="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3">
    <!-- Columna izquierda - Información básica -->
    <div class="space-y-3 md:space-y-6">
      <div class="flex flex-col p-3 bg-white rounded-xl shadow-sm md:p-6">
        <h2 class="flex items-center mb-2 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">
          <v-icon name="md-info" class="mr-2 text-indigo-600" />
          Información básica
        </h2>
        <div class="space-y-2 md:space-y-4">
         
          <div>
            <p class="text-xs text-gray-500 md:text-sm">Cédula profesional</p>
            <p class="text-sm md:font-medium">{{ data.profesionalId }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 md:text-sm">Miembro desde</p>
            <p class="text-sm md:font-medium">{{ data.formattedDate }}</p>
          </div>
        </div>
      </div>
     
    </div>

    <!-- Columna central - Biografía y estadísticas -->
    <div class="space-y-3 md:space-y-6 md:col-span-2">
      <div class="p-3 bg-white rounded-xl shadow-sm md:p-6">
        <h2 class="flex items-center mb-2 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">
          <v-icon name="bi-person-lines-fill" class="mr-2 text-indigo-600" />
          Sobre mí
        </h2>
        <p class="text-sm text-gray-700 md:leading-relaxed">
          {{ data.bio }}
        </p>
      </div>

     
    </div>
  </div>
</div>


<!--End section about expert-->
      <section class="py-2 bg-gradient-to-b from-gray-50 to-white">
        <div class="container px-4 mx-auto max-w-7xl">
          <div class="hidden p-8 bg-white rounded-xl ring-1 ring-gray-100 shadow-lg">
            <div class="flex gap-4 items-center mb-6">
              <v-icon name="bi-person-badge" scale="1.5" class="text-emerald-600" />
              <div>
                <h2 class="text-3xl font-semibold font-openSans text-slate-700">{{ expertStore().expertArea }}</h2>
                <p class="flex gap-3 items-center mt-1 text-lg text-gray-600">
                  <v-icon name="hi-solid-user-circle" class="text-gray-500" />
                  {{ expertStore().expertName }}
                </p>
              </div>
            </div>

            <div v-if="expertInfo.length > 0">
              <ExpertInfoCard :expert="expertInfo[0]" />
            </div>
            <div v-else>
              <div class="py-8 text-center">
                <div class="mx-auto w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
                <p class="mt-2 text-gray-600">Cargando información del experto...</p>
              </div>
            </div>
            <!-- Estado de disponibilidad mejorado -->
        

            <!-- Sección de citas existentes -->
            <section v-if="clientStore().getClientUid && userAppointmentsFb.length > 0"
              class="mt-6 bg-indigo-50 rounded-xl border border-indigo-600">
              <div class="flex flex-col gap-4 items-center p-6 md:flex-row">
                <div class="flex gap-3 items-center">
                  <v-icon name="bi-calendar2-check" class="text-2xl text-indigo-600" />
                  <h3 class="text-lg font-semibold text-indigo-900">
                    Usted tiene una cita programada: {{ userAppointmentsFb[0].day }} {{ userAppointmentsFb[0].dayNumber
                    }}
                    {{ userAppointmentsFb[0].month }} {{ userAppointmentsFb[0].year }}
                  </h3>
                </div>
               
              </div>
            </section>
          </div>
          
          <!-- Selector de horarios mejorado -->
          <section v-if="availableTimeData && availableTimeData.length > 0"
            class="px-3 py-1 mt-3 bg-white rounded-xl ring-1 ring-gray-100 shadow-lg">
            <h3 class="flex gap-2 items-center mb-6 text-xl font-semibold text-gray-900">
              <v-icon name="bi-clock-history" class="text-gray-600" />
              Seleccione su horario preferido
            </h3>
            <!-- <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7"> -->
              <div class="flex overflow-auto gap-2 justify-between">
  <div 
    v-for="(weekDay, index) in weekDays" 
    :key="index" 
    class="animate-fade-up"
    :style="{ animationDelay: `${index * 400}ms` }"
  >
  <DateSquare 
  v-if="availableTimeData[0]?.days"
  @hour-selected="(hour) => getUserSelection(weekDay.day, hour, index)"
  :day-info="{
    day: weekDay.day,
    dayNumber: weekDay.dateNumber,
    availableDay: availableTimeData[0]?.days.find(d => d.day === weekDay.day)?.availableDay || false,
    slots: availableTimeData[0]?.days.find(d => d.day === weekDay.day)?.slots || []
  }" 
  :available-for-appointment="availableTimeData[0]?.days.find(d => d.day === weekDay.day)?.availableDay || false" 
  :selected-day="userDateSelection"
  :selected-hour="userHourSelection" 
  :index="index"
/>
  </div>
</div>
          </section>

          <!-- Confirmación de cita mejorada -->
          <article 
            class="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl">
            <div  v-if="useAppointmentStore().getSelectedHour" class="flex flex-col gap-6 items-center p-8 animate-fade-down animate-delay-300 md:flex-row">
              <div class="flex-1">
                <h3 class="flex gap-3 items-center text-2xl font-semibold text-white">
                  <v-icon name="bi-calendar" class="text-white" />
                  <span>
                    Confirmación de cita -
                    <span class="font-bold">{{ useAppointmentStore().getFormattedDate }} </span>
                   <span class="font-mono"> a las {{ useAppointmentStore().getSelectedHour }}hrs</span>
                  </span>
                </h3>
                <p class="mt-2 text-blue-100">
                  Por favor revise los detalles antes de confirmar
                </p>
              </div>
              <button @click="scheduleAppointment"
        class="flex items-center px-8 py-3 space-x-2 font-semibold text-blue-900 bg-white rounded-xl transition-all hover:bg-blue-50">
  <v-icon name="bi-send-check" class="text-blue-600" />
  <span>Confirmar cita</span>
</button>
            </div>
            
          </article>
        </div>
      </section>

      <div class="p-3 m-2 bg-white rounded-xl shadow-sm md:p-6">
        <h2 class="flex items-center mb-2 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">
          <v-icon name="bi-graph-up" class="mr-2 text-indigo-600" />
          Estadísticas
        </h2>
        <div class="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-3">
          <div class="p-2 text-center bg-blue-50 rounded-lg md:p-4">
            <p class="text-lg font-bold text-indigo-700 md:text-2xl">{{ data.experienceYears }}+</p>
            <p class="text-xs text-gray-600 md:text-sm">Años de experiencia</p>
          </div>
          <div class="p-2 text-center bg-blue-50 rounded-lg md:p-4">
            <p class="text-lg font-bold text-indigo-700 md:text-2xl">{{ data.completedSessions }}</p>
            <p class="text-xs text-gray-600 md:text-sm">Sesiones completadas</p>
          </div>
          <div class="p-2 text-center bg-blue-50 rounded-lg md:p-4">
            <p class="text-lg font-bold text-indigo-700 md:text-2xl">
              {{ data.rating }}
              <v-icon name="io-star" class="inline-block ml-1 text-indigo-600" />
            </p>
            <p class="text-xs text-gray-600 md:text-sm">({{ data.totalRatings }} reseñas)</p>
          </div>
        </div>
      </div>

      <!-- Reseñas (oculto por ahora) -->
      <div class="hidden p-3 bg-white rounded-xl shadow-sm md:p-6">
        <h2 class="flex items-center mb-2 text-lg font-bold text-gray-800 md:mb-4 md:text-xl">
          <v-icon name="bi-chat-square-text" class="mr-2 text-indigo-600" />
          Reseñas recientes
        </h2>
        <div class="py-6 text-center text-gray-400">
          <v-icon name="bi-chat-square-text" class="mx-auto mb-2 text-3xl md:text-4xl" />
          <p class="text-sm">No hay reseñas todavía</p>
        </div>
      </div>

      <!-- Sección de formulario mejorada -->
      <section class="py-3 bg-gray-50">
        <div class="container px-4 mx-auto max-w-7xl">
          <div class="grid gap-8 lg:grid-cols-2">
    

            <!-- Formulario de contacto mejorado -->
            <div class="hidden p-8 bg-white rounded-xl ring-1 ring-gray-100 shadow-lg">
              <div class="flex gap-3 items-center mb-8">
           
                <h2 class="text-2xl font-bold text-gray-900">Formulario de contacto</h2>
              </div>

              <!-- Sección de adjuntos mejorada -->
              <div class="mb-8">
                <label class="block mb-4 text-lg font-medium text-gray-700">
                  
                  Adjuntar documentos
                </label>
                <div
                  class="relative rounded-xl border-2 border-gray-300 border-dashed transition-colors hover:border-emerald-500">
                  <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div class="flex flex-col justify-center items-center p-8 text-center">
             
                    <p class="text-gray-500">Arrastra archivos o haz clic para subir</p>
                    <p class="mt-2 text-sm text-gray-400">Formatos soportados: PDF, JPG, PNG (hasta 5MB)</p>
                  </div>
                </div>
              </div>

              <!-- Políticas mejoradas -->
              <div class="p-4 mb-8 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <div class="flex gap-3 items-start">
                  <v-icon name="bi-info-circle" class="flex-shrink-0 mt-1 text-blue-500" />
                  <div>
                    <h3 class="text-lg font-semibold text-blue-800">Política de privacidad</h3>
                    <p class="mt-2 text-blue-700">
                      Su información está protegida bajo nuestra política de seguridad. No compartimos datos personales
                      con terceros.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Botón de envío mejorado -->
              <button type="submit"
                class="flex gap-2 justify-center items-center px-8 py-4 w-full text-lg font-semibold text-white bg-emerald-600 rounded-xl transition-all transform hover:bg-emerald-700 hover:shadow-lg">
                <v-icon name="bi-send" class="text-xl" />
                Enviar solicitud
              </button>
            </div>
          </div>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte

// Create an instance of Notyf
const notyf = new Notyf({
  duration: 3000,
  dismissible:true,
  ripple:true,
  position:{
    x:'center',
    y:'top'
  }
});

import { onMounted, } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

//Pinia (props)
const expertsStore = experts();


//(route.params.name);
const props = defineProps({
  title: {
    type: String,
    default: 'Profesionales y Expertos en CONTADURÍA',
    required: false
  },
  area: {
    type: String,
    default: 'Ciencias Sociales',
    required: false
  },


  expertType: {
    type: String,
    default: 'Contadores'
  },


  dataInfo: {
    type: Object,
    required: false
  },
});


// Computed para determinar la disponibilidad según la fecha y hora actual




import '@vuepic/vue-datepicker/dist/main.css'
import { addDoc, collection, doc, getDocs, getFirestore, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import DateSquare from '@/ExpertoInfoView/DateSquare.vue';
import clientStore from '@/store/client';
import { authStore } from '@/store/auth';
import { experts } from '@/store/experts';
import expertStore from '@/store/expert';
import systemStore from '@/store/system';
import ExpertInfoCard from '@/components/Expert/ExpertInfoCard.vue';
import { useAppointmentStore } from '@/store/appointment';
import LoaderBlue from '@/animations/LoaderBlue.vue';


const sysStore = systemStore()

const availableTimeData = ref<any>()
//Function to select the user date and hour

//Firebase Stuff
const db = getFirestore()
const collectionDates = collection(db, `Dates`)

const collectionMockExperts = collection(db, `MockExperts/${sysStore.getSelectedExpertUid}/Schedule`) //V2 This will get as param the UID of the expert based on the click that user did when clicking on the expert (in the ExpertsListView)
//TODO:Add Interface to it

const isLoading = ref(true)


//Function to get the dates from Firebase
const getDates = async () => {
  isLoading.value = true;
  availableTimeData.value = [];
  try {
    const querySnapshot = await getDocs(collectionMockExperts);
    const docData = querySnapshot.docs[0]?.data();
    
    if (!docData?.days) {
      console.error('No se encontró la estructura de días');
      return;
    }

    const today = new Date();
    const currentDay = today.getDay();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    // Reordenar días para que empiece por hoy
    const reorderedDays = [
      ...daysOfWeek.slice(currentDay),
      ...daysOfWeek.slice(0, currentDay)
    ];

    // Actualizar el estado con la estructura de days
    availableTimeData.value = [{
      days: docData.days.map(day => ({
        ...day,
        // Asegurarse de que los slots estén inicializados
        slots: day.slots || []
      }))
    }];

    console.log('Datos cargados (solo days):', availableTimeData.value);
    getClientAppointments();
    
  } catch (error) {
    console.error('Error al obtener fechas:', error);
    notyf.error('Error al cargar el horario');
  } finally {
    isLoading.value = false;
  }
};


/*
addDoc(collectionMockExperts, {
    availableForAppointment: false,
    userUid:'expert_1'
    weeklySchedule:[
      {
        dayInfo:{
          isDayAvailable: false,
          day: 'Lunes',
          availableHours: ['10:30', '11:00', '12:00', '13:00', '14:30', '15:00', '16:00', '17:00'],
          hoursTaken: ['10:00', '11:00']
        }
      },
      {
        dayInfo: {
          isDayAvailable: false,
          day: 'Martes',
          availableHours: ['10:00', '11:00', '12:00', '13:00', '14:30', '15:00', '16:00', '17:00'],
          hoursTaken: ['10:00', '11:00']
        }
      },
      {
        dayInfo: {
          isDayAvailable: false,
          day: 'Miércoles',
          availableHours: ['10:00', '11:00', '12:00', '13:00', '14:30', '15:00', '16:00', '17:00'],
          hoursTaken: ['14:30', '12:00']
        }
      },
      {
        dayInfo: {
          isDayAvailable: false,
          day: 'Jueves',
          availableHours: ['10:00', '11:00', '12:00', '13:00', '14:30', '15:00', '16:00', '17:00'],
          hoursTaken: ['10:30', '11:00']
        }
      },
      {
        dayInfo: {
          isDayAvailable: false,
          day: 'Viernes',
          availableHours: ['10:00', '11:00', '12:00', '13:00', '14:30', '15:00', '16:00', '17:00'],
          hoursTaken: ['10:30', '11:00']
        }
      },
      {
        dayInfo: {
          isDayAvailable: false,
          day: 'Sábado',
          availableHours: ['10:00', '11:00', '12:00', '13:00', '14:30', '15:00', '16:00', '17:00'],
          hoursTaken: ['10:30', '11:00']
        }
      },
      {
        dayInfo: {
          isDayAvailable: false,
          day: 'Domingo',
          availableHours: ['10:00', '11:00', '12:00', '13:00', '14:30', '15:00', '16:00', '17:00'],
          hoursTaken: ['10:00', '11:00']
        }
      }
    ],

}


    ),
*/
const addNewDate = async () => {
  try {
    addDoc(collectionMockExperts, {
      name: 'Luis Ángel',
      email: 'luis.angel@consultagratis.com',
      age: 25,
      active: true,
      createdAt: Timestamp.now(),
      userId: '123abc',
    })
    //Set the document id the same as the userId
    const docRef = doc(collectionMockExperts);
    updateDoc(docRef, { id: '123abc' });
    //('Usuario agregado correctamente');

  } catch (error) {
    //('Error al agregar el usuario ', error);

  }
}


//Variables to set the user selection
const userDateSelection = ref();
const userHourSelection = ref();
const userIndexSelection = ref();
const userDayNumber = ref();
const userMonth = ref();
const newDate = new Date().toLocaleString('es-ES', { month: 'long' });
//Function to set the user selection (hour, date)
const getUserSelection = (day: string, hour: string, index: number) => {
  //('Selección:', { day, hour, index });
  userDateSelection.value = day;
  userHourSelection.value = hour;
  // Aquí puedes agregar cualquier lógica adicional
};

const resetUserSelection = () => {
  userDateSelection.value = '';
  userHourSelection.value = '';
  userDayNumber.value = '';
  userMonth.value = '';
}


//Validate user has selected a valid date that is not taken (to see if the hour is available and not as been already taken in the availableHours array)



const client = clientStore();

//Variable to deny the user to schedule an appointment if he has already scheduled one
const userHasScheduled = ref(false);


//Getting the client appointments function


const userAppointmentsFb = ref<IFutureAppointment[]>([]);
const getClientAppointments = async () => {
  try {
    if (client.getClientUid) { //If client is logged in then the expert data could be edited (add date)
      const clientCollectionFutureAppointments = collection(db, `users/${client.getClientUid}/FutureAppointments`);
      const querySnapshot = await getDocs(clientCollectionFutureAppointments);
      //('GETTING CLIENT APPOINTMENTS');
      userAppointmentsFb.value = [];
      querySnapshot.forEach((doc) => {
        userAppointmentsFb.value.push({ id: doc.id, ...doc.data() });
        //(doc.data());
      });
      //(userAppointmentsFb.value);
      
      if (userAppointmentsFb.value.some((appointment: IFutureAppointment) => appointment.userId === authStore().getUserUid)) {
        //('User has scheduled an appointment, userUid: ', authStore().getUserUid);
     
      } else {
        //('User has not scheduled an appointment, userUid: ', authStore().getUserUid);
      }
    }
  } catch (error) {
    //(`Error getting client appointments: ${error}`);
  }
}

//Getting the client appointments onMounted



//Add future appointment to the client collection
const addFutureAppointment = async () => {
  try {
    if (client.getClientUid) { //If client is logged in then the expert data could be edited (add date)
      const clientCollectionFutureAppointments = collection(db, `users/${client.getClientUid}/FutureAppointments`);
      const FutureAppointment = {
        day: userDateSelection.value,
        hour: userHourSelection.value,
        month: userMonth.value,
        dayNumber: userDayNumber.value,
        createdAt: Timestamp.now(),
        year: new Date().getFullYear(),
        userId: client.getClientUid,
        proffession: props.proffession,
      }
      await addDoc(clientCollectionFutureAppointments, FutureAppointment);
    }
    //('Future appointment added successfully');
    
  } catch (error) {
    //(error);
  }
}


//Schedule appointment to the expert collection and call addFutureAppointment to add the appointment to the client collection (if user has an appointment scheduled with this expert, do not allow to schedule another one)
const addAppointmentToClient = async() => {
  try {
 //Get the user subcollection that'll match the uid from pinia
 const usersCollection = collection(db, `users/${authStore().getUserUid}/FutureAppointments`);
 await addDoc(usersCollection, {
   hour: useAppointmentStore().selectedHour,
   day: useAppointmentStore().dayName,
   formattedDate: useAppointmentStore().formattedDate,
   expertUid: sysStore.getSelectedExpertUid,
   userId: authStore().getUserUid,
   createdAt: Timestamp.now(),
   expertName: data.name,
   specialty: data.specialty,
   professionalId: data.profesionalId,
   appointmentLink:''
 })
 //('Cita agregada exitosamente');
  } catch (error) {
    //(error);
  }
}


//Getting the dates and returning the hours taken that matches with the user uid
const getIsUserScheduled =  async () => {
  try {
    console.log('Verificando si el usuario ya tiene cita...');
    const currentUserId = authStore().getUserUid;
    console.log('ID del usuario actual:', currentUserId);
    
    // Aseguramos que los datos estén cargados
    if (!availableTimeData.value || availableTimeData.value.length === 0) {
      console.log('Cargando fechas...');
      await getDates();
    }

    // Verificamos si el usuario ya tiene una cita programada
    const hasAppointment = availableTimeData.value.some((week: any) => 
      week.days.some((day: any) => 
        day.slots.some((slot: any) => 
          slot.takenBy === currentUserId
        )
      )
    );

    console.log('¿Tiene cita programada?', hasAppointment);
    return hasAppointment;
  } catch (error) {
    console.error('Error al verificar citas existentes:', error);
    return true; // En caso de error, asumimos que ya tiene cita para evitar duplicados
  }
};

const scheduleAppointment = async () => {
  const appointmentStore = useAppointmentStore();

  //Validate if user is logged in
  if (!authStore().getUserUid || !client.getClientUid) {
    notyf.error('Por favor inicie sesión para programar una cita');
    authStore().isAuth = false;
    authStore().setUserUid('');
    client.setClientUid('');
    router.push('/tabs/tab1');
    return;
  }

  // Validate that a day and hour have been selected
  if (!appointmentStore.dayName || !appointmentStore.selectedHour) {
    alert('Por favor selecciona una fecha y hora');
    return;
  }

  isLoading.value = true;
  
  try {
    // Primero obtenemos las fechas
    await getDates();
    
    // Verificamos si el usuario ya tiene una cita programada
    const hasExistingAppointment = await getIsUserScheduled();
    if (hasExistingAppointment) {
      notyf.error('Ya tiene una cita programada con este experto');
      isLoading.value = false;
      return;
    }

    // Resto del código para programar la cita
    console.log('Programando cita para:', {
      day: appointmentStore.dayName,
      hour: appointmentStore.selectedHour,
      formattedDate: appointmentStore.formattedDate
    });

    // 1. Get the reference to the selected expert's document
    const expertRef = doc(db, 'MockExperts', sysStore.getSelectedExpertUid);
    
    // 2. Get the expert's 'Schedule' collection
    const scheduleRef = collection(expertRef, 'Schedule');
    
    // 3. Query the documents in the collection, ignoring the one with the same UID as the expert
    const q = query(scheduleRef, where('userUid', '!=', 'testing'));
    const querySnapshot = await getDocs(q);
    
    // Check if no documents were found
    if (querySnapshot.empty) {
      console.error('No se encontró el horario del experto');
      return;
    }

    // 4. Get the reference and data of the first found document
    const docRef = querySnapshot.docs[0].ref;
    const docData = querySnapshot.docs[0].data();
    
    // 5. Create a copy of the days array to manipulate it without affecting the original directly
    const updatedDays = [...docData.days];
    
    // 6. Find the index of the selected day within the array
    const dayIndex = updatedDays.findIndex(day => 
      day.day.toLowerCase() === appointmentStore.dayName.toLowerCase()
    );
    
    // 7. If the day was found
    if (dayIndex !== -1) {
      // 8. Update the slots of the found day by marking the selected hour as taken
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        slots: updatedDays[dayIndex].slots.map(slot => 
          slot.hour === appointmentStore.selectedHour
            ? { ...slot, takenBy: client.getClientUid, isConfirmed:false } // Mark the slot as taken
            : slot
        )
      };
      
      // 9. Save the changes in Firestore
      await updateDoc(docRef, { days: updatedDays });
      console.log('Horario actualizado exitosamente');
      
      // 10. Optional: Reset values and refresh data
      addAppointmentToClient(); // Add the appointment to the client
      appointmentStore.setAppointment('', '', ''); // Clear the current selection
      availableTimeData.value = [];
      userHasScheduled.value = true;
      getDates(); // Refresh the available dates (if applicable)

    } else {
      // If the day was not found in the document
      console.error('Día no encontrado en el horario');
    }
  } catch (error) {
    // Error handling for updating the document
    console.error('Error al actualizar el horario en Firebase:', error);
  } finally {
    // End the loading state
    isLoading.value = false;
  }
};


interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}

interface IExpert {
  name: string;
  profesionalId: string;
  userUid: string;
  suspensionReason: string;
  experienceYears: number;
  specialty: string;
  totalRatings: number;
  isSuspended: boolean;
  bio: string;
  createdAt: ITimestamp;
  email: string;
  rating: number;
  completedSessions: number;
  isBanned: boolean;
}

// Para el array de expertos

const expertInfo = ref<IExpert[]>([]);
const mockExpertInfoCollection = collection(db, 'MockExperts');
const qGetMockExpertInfo = query(mockExpertInfoCollection, where('userUid', '==', sysStore.getSelectedExpertUid));
const getExpertInfo = async () => {
  try {
    const expertSnapshot = await getDocs(qGetMockExpertInfo);
    if (expertSnapshot.empty) {
      console.log('No se encontró información del experto');
      expertInfo.value = [];
      return;
    }
    expertInfo.value = expertSnapshot.docs.map(doc => doc.data() as IExpert);
  } catch (error) {
    console.error('Error en getExpertInfo:', error);
    expertInfo.value = [];
  }
};




const getSchedulesFromAllExperts = async () => {
  try {
    // 1. Obtener todos los expertos
    const expertsSnapshot = await getDocs(collection(db, 'MockExperts'));
    
    // 2. Para cada experto, obtener su Schedule
    const schedulesPromises = expertsSnapshot.docs.map(async (expertDoc) => {
      const scheduleSnapshot = await getDocs(collection(db, `MockExperts/${expertDoc.id}/Schedule`));
      return {
        expertId: expertDoc.id,
        schedules: scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      };
    });

    // 3. Esperar a que todas las consultas se completen
    const allSchedules = await Promise.all(schedulesPromises);
    return allSchedules;
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    throw error;
  }
};

// Uso



// En ExpertInfoView.vue
const getWeekDays = () => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Domingo) a 6 (Sábado)
  
  // Reordenar el array para que empiece por el día actual
  const reorderedDays = [
    ...days.slice(currentDay),
    ...days.slice(0, currentDay)
  ];
  
  // Crear array de los próximos 7 días
  return reorderedDays.map((day, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return {
      day,
      dateNumber: date.getDate(),
      fullDate: date
    };
  });
};

// En tu data o setup
const weekDays = ref(getWeekDays());



const handleHourSelected = (hour: string, day: string) => {
  //('Hora seleccionada en el padre:', { hour, day });
  userDateSelection.value = day;
  userHourSelection.value = hour;
  
  // Aquí puedes agregar cualquier lógica adicional que necesites
  // como actualizar el estado de la cita, mostrar un resumen, etc.
};


import { reactive } from 'vue';  

import InfoUserLoader from '@/animations/InfoUserLoader.vue';
import ContentLoader from '@/animations/ContentLoader.vue';
import router from '@/router';
const isLoadingExpertInfo = ref(true);
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

const expertMockCollection = collection(db, 'MockExperts');
const expertData = ref();
const getExpertData = async () => {
    try {
        const qGetExpertMatch = query(expertMockCollection, where('userUid', '==', sysStore.getSelectedExpertUid));

        const expertMockSnapshot = await getDocs(qGetExpertMatch);
        if(expertMockSnapshot.empty){
            //('No se encontró experto en la vista ExpertInfoView');
            return;
        }
        //('Se encontro experto en la vista ExpertInfoView');
        //(expertMockSnapshot.docs[0].data());
        
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
        isLoadingExpertInfo.value = false;
        } catch (error) {
        //(error);
    } finally {
        isLoadingExpertInfo.value = false;
    }
}

onMounted(() => {
    //('Selected expert uid:', sysStore.getSelectedExpertUid);
    
  })
//En la cita deberá haber un banner donde diga que sta prohibido compartir datos de contacto con el experto (no se permite compartir datos de contacto con el experto) (LOGO)
// Con fines de calidad en el servicio, la  llamada será grabada y podrá ser reproducida por el experto en caso de que el cliente no cumpla con el servicio contratado.
//Banner en el top permanente con el nombre de la empresa/app 
 
const handleRefresh = (event: CustomEvent) => {
        setTimeout(() => {
          // Any calls to load data go here
          availableTimeData.value = [];
          data.formattedDate = '';
          data.experienceYears = 0;
          data.completedSessions = 0;
          data.profesionalId = '';
          data.email = '';
          data.isBanned = false;
          data.isSuspended = false;
          data.suspensionReason = '';
          data.imgUrl = '';
          isLoadingExpertInfo.value = true;
          
          if(event.target){
            event.target.complete();
          }
          getDates();
          getExpertData();
          
        }, 200);
      }
//All the unmounted values
/**
 * onMounted(() => {
  userHasScheduled.value = false;
  getDates();
})
  onMounted(() => {
  getExpertInfo();
})
  onMounted(() => {
  getSchedulesFromAllExperts();
  getExpertData();
})
 */

onIonViewDidEnter(() => {
  console.log('Component ViewDidEnter (similar to mounted)');
  userHasScheduled.value = false;
  getDates();
  getExpertInfo();
  //getSchedulesFromAllExperts();
  getExpertData();
})

onIonViewDidLeave(() => {
  availableTimeData.value = [];
  data.formattedDate = '';
  data.experienceYears = 0;
  data.completedSessions = 0;
  data.profesionalId = '';
  data.email = '';
  data.isBanned = false;
  data.isSuspended = false;
  data.suspensionReason = '';
  data.imgUrl = '';
})


const names = [
  [
    '<span class="text-sm animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-sm text-blue-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
    '<span class="text-sm animate-fade animate-duration-300 animate-delay-300">en</span>' +
    '<span class="text-sm animate-fade animate-duration-300 animate-delay-500">linea</span>' +
    '<span class="text-sm text-blue-500 animate-fade animate-duration-300 animate-delay-500">.com</span>'
  ],
  [
    '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-blue-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
    '<span class="text-blue-500 animate-fade animate-duration-300 animate-delay-300">.com</span>'
  ],
  [
    '<span class="text-sm animate-fade-down animate-delay-100">consulta</span>' +
    '<span class="text-sm text-blue-700 animate-fade animate-delay-200">especializada</span>' +
    '<span class="text-sm text-blue-500 animate-fade animate-delay-300">.com</span>'
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
})

onIonViewDidLeave(() => {
  if(timeoutId){
    clearInterval(timeoutId);
    timeoutId = null;
  }
})
</script>

<style scoped></style>
