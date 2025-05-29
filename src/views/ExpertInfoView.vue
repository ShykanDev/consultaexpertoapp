<template>
 <ion-page>
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title class="text-2xl font-bold text-center">Agendar Cita</ion-title>
      </ion-toolbar>
    </ion-header>
      <!-- Sección principal mejorada -->
      <section class="py-12 bg-gradient-to-b from-gray-50 to-white">
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
            <div v-if="isAvailable" class="p-6 bg-emerald-50 rounded-lg">
              <div class="flex flex-col gap-4 items-start md:flex-row md:items-center">
                <div class="flex gap-3 items-center">
                  <v-icon name="bi-check-circle" class="text-2xl text-emerald-600 animate-pulse" />
                  <span class="text-lg font-semibold text-emerald-700">Disponible para prueba gratuita</span>
                </div>
                <a href="#"
                  class="flex items-center px-6 py-3 space-x-2 font-medium text-white bg-emerald-600 rounded-xl transition-all transform hover:bg-emerald-700 hover:shadow-lg">
                  <v-icon name="bi-calendar-plus" class="text-lg" />
                  <span>Agendar prueba gratuita</span>
                </a>
              </div>
            </div>

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
                <RouterLink :to="{ name: 'user' }"
                  class="flex items-center px-4 py-2 space-x-2 text-indigo-700 bg-white rounded-lg shadow-sm">
                  <v-icon name="bi-eye" />
                  <span>Ver detalles</span>
                </RouterLink>
              </div>
            </section>
          </div>
          
          <!-- Selector de horarios mejorado -->
          <section v-if="availableTimeData && availableTimeData.length > 0"
            class="p-6 mt-8 bg-white rounded-xl ring-1 ring-gray-100 shadow-lg">
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
    :style="{ animationDelay: `${index * 100}ms` }"
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
/>
  </div>
</div>
          </section>

          <!-- Confirmación de cita mejorada -->
          <article 
            class="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl">
            <div class="flex flex-col gap-6 items-center p-8 md:flex-row">
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

      <!-- Sección de formulario mejorada -->
      <section class="py-12 bg-gray-50">
        <div class="container px-4 mx-auto max-w-7xl">
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Servicios mejorados -->
            <div class="p-8 bg-white rounded-xl ring-1 ring-gray-100 shadow-lg">
              <h2 class="flex gap-2 items-center mb-6 text-2xl font-bold text-gray-900">
                <v-icon name="bi-patch-question" class="text-blue-600" />
                Servicios profesionales
              </h2>
              <div class="grid gap-6 md:grid-cols-2">
                <div v-for="(item, index) in offersLeft" :key="index"
                  class="flex gap-3 items-start p-4 bg-gray-50 rounded-lg">
                  <v-icon :name="item.icon" class="flex-shrink-0 mt-1 text-blue-600" />
                  <p class="leading-relaxed text-gray-700">{{ item.text }}</p>
                </div>
              </div>
            </div>

            <!-- Formulario de contacto mejorado -->
            <div class="p-8 bg-white rounded-xl ring-1 ring-gray-100 shadow-lg">
              <div class="flex gap-3 items-center mb-8">
                <v-icon name="bi-chat-dots" class="text-2xl text-emerald-600" />
                <h2 class="text-2xl font-bold text-gray-900">Formulario de contacto</h2>
              </div>

              <!-- Sección de adjuntos mejorada -->
              <div class="mb-8">
                <label class="block mb-4 text-lg font-medium text-gray-700">
                  <v-icon name="bi-paperclip" class="mr-2" />
                  Adjuntar documentos
                </label>
                <div
                  class="relative rounded-xl border-2 border-gray-300 border-dashed transition-colors hover:border-emerald-500">
                  <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div class="flex flex-col justify-center items-center p-8 text-center">
                    <v-icon name="bi-cloud-upload" class="mb-4 text-4xl text-gray-400" />
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
import { computed, onMounted, } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

//Pinia (props)
const expertsStore = experts();


console.log(route.params.name);
const props = defineProps({
  title: {
    type: String,
    default: 'Profesionales y Expertos en CONTADURÍA'
  },
  area: {
    type: String,
    default: 'Ciencias Sociales'
  },
  availableDay: {
    type: String,
    default: 'Tue'
  },
  availableHourStart: {
    type: Number,
    default: 10
  },
  availableHourEnd: {
    type: Number,
    default: 14
  },
  expertType: {
    type: String,
    default: 'Contadores'
  },
  description: {
    type: String,
    default:
      'Los Contadores trabajan tanto para el sector público, como para el privado y son aquellos profesionales responsables del estado financiero y de los libros contables del individuo o empresa que haya solicitado sus servicios, en tal sentido, su misión consiste en velar que su clientela cumpla con la legislación aplicable y con los procedimientos establecidos, además de garantizar que haya registro de los ingresos y egresos de sus cuentas.'
  },
  offersLeft: {
    type: Array,
    default: () => [
      { icon: 'fas fa-file-alt', text: 'Documentar informes financieros para los clientes' },
      { icon: 'fas fa-book', text: 'Revisar los libros contables de los clientes.' },
      { icon: 'fas fa-chart-bar', text: 'Analizar las ganancias y los gastos.' },
      { icon: 'fas fa-balance-scale', text: 'Elaborar el balance de los libros financieros.' },
      { icon: 'fas fa-pen-nib', text: 'Redactar informes sobre el estado financiero de sus clientes.' }
    ]
  },
  offersRight: {
    type: Array,
    default: () => [
      { icon: 'fas fa-file-excel', text: 'Manejar registros, sistemas y presupuestos financieros.' },
      { icon: 'fas fa-user-tie', text: 'Hacer auditorías financieras para sus clientes.' },
      { icon: 'fas fa-tasks', text: 'Brindar asesoría financiera y tributaria.' },
      { icon: 'fas fa-glasses', text: 'Examinar las cuentas y registros financieros.' },
      { icon: '', text: 'Y mucho más' }
    ]
  },
  categories: {
    type: Array,
    default: () => [
      { name: 'Contador', link: '#', active: true },
      { name: 'Asesorías Legales', link: './c-abogados.php', active: false },
      { name: 'Arquitecto', link: './c-arquitectos.php', active: false },
      { name: 'Importación y Exportación', link: './c-comercio.php', active: false },
      { name: 'Doctor', link: './c-doctores.php', active: false },
      { name: 'Gestoría en trámites', link: './c-gestorias.php', active: false },
      { name: 'Ingeniería Computacional', link: './c-computacion.php', active: false },
      { name: 'Marketing', link: './c-marketing.php', active: false },
      { name: 'Peritaje', link: './c-peritaje.php', active: false },
      { name: 'Publicidad', link: './c-publicidad.php', active: false },
      { name: 'Servicios Web', link: './c-web.php', active: false },
      { name: 'Traductor', link: './c-traductores.php', active: false }
    ]
  },
  dataInfo: {
    type: Object,
    required: true
  },
  proffession: {
    type: String,
    required: true,
    default: 'Contador'
  }
});


// Computed para determinar la disponibilidad según la fecha y hora actual
const isAvailable = computed(() => {
  const now = new Date();
  const dayOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = dayOptions[now.getDay()];
  const currentHour = now.getHours();
  return (
    currentDay === props.availableDay &&
    currentHour >= props.availableHourStart &&
    currentHour < props.availableHourEnd
  );
});



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


const sysStore = systemStore()

const availableTimeData = ref<IDateRoot[]>()
//Function to select the user date and hour

//Firebase Stuff
const db = getFirestore()
const collectionDates = collection(db, `Dates`)

const collectionMockExperts = collection(db, `MockExperts/${sysStore.getSelectedExpertUid}/Schedule`) //V2 This will get as param the UID of the expert based on the click that user did when clicking on the expert (in the ExpertsListView)
//TODO:Add Interface to it

const isLoading = ref(true)


//Function to get the dates from Firebase
const getDates = async () => {
  try {
    // 1. Obtener datos de Firebase
    const querySnapshot = await getDocs(collectionMockExperts);
    const docData = querySnapshot.docs[0]?.data();
    if (!docData?.weeklySchedule) return;

    const today = new Date();
    const currentDay = today.getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    // Reordenar días para que empiece por hoy
    const reorderedDays = [
      ...daysOfWeek.slice(currentDay),  // Días de hoy en adelante
      ...daysOfWeek.slice(0, currentDay) // Días pasados de la semana
    ];

    // 2. Crear un mapa de días para acceso rápido
    const scheduleMap = new Map(
      docData.weeklySchedule.map(day => [day.dayInfo.day, day])
    );

    // 3. Generar la semana actual empezando por hoy
    const currentWeekSchedule = reorderedDays.map((dayName, index) => {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + index); // Sumar días a partir de hoy

      const existingDay = scheduleMap.get(dayName) || { dayInfo: { hoursTaken: [] } };
      
      return {
        dayInfo: {
          ...existingDay.dayInfo,
          day: dayName,
          dayNumber: targetDate.getDate(),
          fullDate: targetDate.toISOString().split('T')[0],
          monthName: targetDate.toLocaleString('es-ES', { month: 'long' })
        }
      };
    });

    // 4. Actualizar el estado
    availableTimeData.value = [{
      ...docData,
      weeklySchedule: currentWeekSchedule
    }];

    console.log(availableTimeData.value);
  } catch (error) {
    console.error('Error al obtener fechas:', error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  getDates();
})

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
    console.log('Usuario agregado correctamente');

  } catch (error) {
    console.log('Error al agregar el usuario ', error);

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
  console.log('Selección:', { day, hour, index });
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

const validateUserSelection = (data) => {
  if (!userDateSelection.value || !userHourSelection.value) {
    alert('Por favor, selecciona una fecha y hora válida');
    return false;
  }
  if (data.hoursTaken.includes(userHourSelection.value)) {
    alert('Por favor, selecciona una hora disponible');
    return false;
  }
  alert('Fecha y hora válida');
  return true;
}
const availableHours = ref([]);

const arrayToUpdate = ref();

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
      console.log('GETTING CLIENT APPOINTMENTS');
      userAppointmentsFb.value = [];
      querySnapshot.forEach((doc) => {
        userAppointmentsFb.value.push({ id: doc.id, ...doc.data() });
        console.log(doc.data());
      });
      if (userAppointmentsFb.value.length > 0) {
        if (userAppointmentsFb.value.some(e => e.profession === props.profession)) {
          console.log('User has scheduled an appointment with this expert');
          userHasScheduled.value = true;
        }
      }
    }
  } catch (error) {
    console.log(`Error getting client appointments: ${error}`);
  }
}

//Getting the client appointments onMounted
onMounted(() => {
  getClientAppointments();
})


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
  } catch (error) {
    console.log(error);
  }
}


//Schedule appointment to the expert collection and call addFutureAppointment to add the appointment to the client collection (if user has an appointment scheduled with this expert, do not allow to schedule another one)
const scheduleAppointment = async () => {
  const appointmentStore = useAppointmentStore();

  
    if (!appointmentStore.dayName || !appointmentStore.selectedHour) {
    alert('Por favor selecciona una fecha y hora');
    return;
  }

  try {
    console.log('Programando cita para:', {
      day: appointmentStore.dayName,
      hour: appointmentStore.selectedHour,
      formattedDate: appointmentStore.formattedDate
    });

    // Resto del código...
  } catch (error) {
    console.error('Error al actualizar el horario en Firebase:', error);
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
const getExpertInfo = async () => { //V2
  expertInfo.value = [];
  try {
    const expertSnapshot = await getDocs(qGetMockExpertInfo);
    if(expertSnapshot.empty) {
      console.log('There are no data available to fetch');
      return;
    }
    const expertData = expertSnapshot.docs.map((doc) => doc.data() as IExpert);
    console.log(expertData);
    expertInfo.value = expertData;
  } catch (error) {
    console.log(error);
  }
}


onMounted(() => {
  getExpertInfo();
})

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
onMounted(() => {
  getSchedulesFromAllExperts();
})

const transformAndUpdateSchedules = async () => {
  try {
    console.log('Iniciando actualización de horarios...');
    
    // 1. Obtener todos los expertos
    const expertsSnapshot = await getDocs(collection(db, 'MockExperts'));
    console.log(`Encontrados ${expertsSnapshot.size} expertos`);
    
    // 2. Para cada experto, actualizar su Schedule
    for (const expertDoc of expertsSnapshot.docs) {
      const expertId = expertDoc.id;
      console.log(`Procesando experto: ${expertId}`);
      
      const scheduleRef = collection(db, `MockExperts/${expertId}/Schedule`);
      const scheduleSnapshot = await getDocs(scheduleRef);
      console.log(`Encontrados ${scheduleSnapshot.size} documentos de horario`);

      for (const doc of scheduleSnapshot.docs) {
        try {
          const oldData = doc.data();
          console.log('Datos antiguos:', JSON.stringify(oldData, null, 2));
          
          // Verificar si weeklySchedule existe
          if (!oldData.weeklySchedule || !Array.isArray(oldData.weeklySchedule)) {
            console.error('El formato de datos no es el esperado (weeklySchedule no encontrado o no es un array)');
            continue;
          }

          // Mapear días de la semana
          const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
          
          // Crear nuevo formato
          const newSchedule = daysOfWeek.map(dayName => {
            const dayData = oldData.weeklySchedule.find(item => 
              item?.dayInfo?.day === dayName
            );
            
            // Si no existe el día en los datos viejos, crear uno por defecto
            if (!dayData) {
              return {
                day: dayName,
                availableDay: true,
                slots: [
                  { hour: "10:00", takenBy: null },
                  { hour: "11:00", takenBy: null },
                  { hour: "12:00", takenBy: null },
                  { hour: "13:00", takenBy: null },
                  { hour: "14:30", takenBy: null },
                  { hour: "15:00", takenBy: null },
                  { hour: "16:00", takenBy: null },
                  { hour: "17:00", takenBy: null }
                ]
              };
            }
            
            // Mapear horas tomadas
            const hoursTaken = new Set(dayData.dayInfo.hoursTaken || []);
            const availableHours = dayData.dayInfo.availableHours || [];
            
            return {
              day: dayName,
              availableDay: !dayData.dayInfo.isDayAvailable,
              slots: availableHours.map(hour => ({
                hour,
                takenBy: hoursTaken.has(hour) ? null : null
              }))
            };
          });
          
          // Actualizar el documento
          console.log('Nuevo formato:', JSON.stringify(newSchedule, null, 2));
          await updateDoc(doc.ref, { 
            ...oldData, // Mantener los datos existentes
            days: newSchedule
          });
          console.log('Documento actualizado exitosamente');
          
        } catch (docError) {
          console.error(`Error procesando documento ${doc.id}:`, docError);
        }
      }
    }
    
    console.log('Proceso completado');
    return true;
  } catch (error) {
    console.error('Error general:', error);
    return false;
  }
};
const getDayNumber = (dayName: string): number => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days.indexOf(dayName) + 1; // o la lógica que necesites
};
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
  console.log('Hora seleccionada en el padre:', { hour, day });
  userDateSelection.value = day;
  userHourSelection.value = hour;
  
  // Aquí puedes agregar cualquier lógica adicional que necesites
  // como actualizar el estado de la cita, mostrar un resumen, etc.
};
</script>

<style scoped></style>
