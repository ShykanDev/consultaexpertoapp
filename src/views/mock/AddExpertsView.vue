<template>
    <div class="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div class="overflow-hidden mx-auto max-w-4xl bg-white rounded-xl shadow-md">
            <div class="p-8">
                <h1 class="mb-6 text-3xl font-bold text-gray-800">Mock Add Experts View</h1>
                <button @click="addUserToFirebase"
                    class="px-4 py-2 font-bold text-white bg-blue-500 rounded transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                    Agregar
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { onMounted } from 'vue';
//Firebase Utils
const db = getFirestore();
const usersCollection = collection(db, 'MockExperts');

const addUserToFirebase = async () => {
    try {
        const userDocData = await addDoc(usersCollection, {
            userUid: 'unique_id_carlos_beltran', // reemplaza con su UID real
  name: 'Carlos Ignacio Beltrán',
  email: 'carlos.beltran.web@example.com',
  bio: 'Desarrollador web con más de 8 años de experiencia en la creación de soluciones digitales. Especialista en tecnologías modernas y optimización de sitios para alto rendimiento.',
  isSuspended: false,
  isBanned: false,
  suspensionReason: '',
  specialty: 'Servicios Web',
  profesionalId: '87654321',
  experienceYears: 8,
  createdAt: new Date(),
  rating: 4.7,
  totalRatings: 19,
  completedSessions: 143,
        });
        //Now adding firebase subcollections to set the schedule times
        const scheduleCollection = collection(db, 'MockExperts', userDocData.id, 'Schedule');
        await addDoc(scheduleCollection, {
            availableForAppointment: false,
            userUid: 'expert_1',
            weeklySchedule: [
                {
                    dayInfo: {
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
        );
        //Adding the ratings subcollection
        const ratingsCollection = collection(db, 'MockExperts', userDocData.id, 'Ratings');
        await addDoc(ratingsCollection, {
            message: 'Excelente servicio',
            rating: 5,
            createdAt: Timestamp.now(),
        });
        console.log('Experto agregado exitosamente');
    } catch (error) {
        console.error(`Error al agregar experto a Firebase: ${error}`);
    }
}


//TODO:Get the mock experts from firebase and log them to the console
const getMockExperts = async () => {
    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data().specialty, doc.data().name);
    });

}
onMounted(() => {
    getMockExperts();
})

</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
