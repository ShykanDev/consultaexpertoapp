<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <div class="flex justify-between px-5 w-full">
                    <ion-title class="text-center text-blue-600">Agenda</ion-title>
            <span v-html="currentName" :key="currentName"></span>
          </div>
            </ion-toolbar>
        </ion-header>
        <ion-content class="">
            <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <ion-refresher-content></ion-refresher-content>
            </ion-refresher>
            <div v-if="userAppointments.length === 0" class="flex justify-center items-center h-full">
                No tienes citas futuras
            </div>
            <div v-else class="flex flex-col gap-4 py-7 bg-gray-100 ion-padding min-h-dvh">
                <div v-for="(appointment, index) in userAppointments" :key="index" class="flex flex-col gap-5 px-2">
                    <CardInfo :createdAt="appointment.createdAt" :formattedDate="appointment.formattedDate" :userId="appointment.userId" :expertUid="appointment.expertUid" :day="appointment.day" :hour="appointment.hour" :expertName="appointment.expertName" :specialty="appointment.specialty" :professionalId="appointment.professionalId" :appointmentLink="appointment.appointmentLink" />
                </div>
            </div>
        </ion-content>
    </ion-page>
</template> 

<script lang="ts" setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, onIonViewDidLeave } from '@ionic/vue';
import { onIonViewDidEnter } from '@ionic/vue';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ref } from 'vue';
import { authStore as authStoreInstance } from '@/store/auth';
import CardInfo from '@/components/Client/CardInfo.vue';

const handleRefresh = (event: any) => {
    getUserAppointments();
    event.target.complete();    
}

const authStore = authStoreInstance();

const userAppointments = ref<Appointment[]>([]);
const db = getFirestore();
const q = query(collection(db, `users/${authStoreInstance().getUserUid}/FutureAppointments`), where('userId', '==', authStoreInstance().getUserUid));
const getUserAppointments = async () => {
    try {
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            return;
        }   
        userAppointments.value = querySnapshot.docs.map((doc) => doc.data() as Appointment);
    } catch (error) {
        console.log(error);
    }
}

onIonViewDidEnter(() => {
   getUserAppointments();
})

interface Appointment {
    createdAt: {
        seconds: number;
        nanoseconds: number;
    },
    formattedDate: string,
    userId: string,
    expertUid: string,
    day: string,
    hour: string,
    expertName: string,
    specialty: string,
    professionalId: string,
    appointmentLink: string
}

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

</style>