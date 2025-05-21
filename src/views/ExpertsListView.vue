<template>
<ion-page>

<ion-header>
  <ion-toolbar>
    <ion-title class="text-2xl font-bold text-center text-emerald-600 font-inter">Listado de Expertos</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="animate-fade-up">
  <!-- Hero Section -->
  <section class="py-16 text-white bg-gradient-to-r from-emerald-500 to-teal-700">
    <div class="container px-6 mx-auto text-center">
      <h1 class="mb-4 text-4xl font-bold md:text-5xl font-inter">Descubra a Nuestros Expertos</h1>
      <p class="mb-8 text-lg md:text-xl font-inter">Soluciones personalizadas y asesoramiento profesional en diversas áreas</p>
      <ion-button href="/tabs/experts-list#expertos" class="px-8 py-3 text-white rounded-full transition duration-300 hover:bg-gray-100 font-inter">
        Ver Categorías
      </ion-button>
    </div>
    <div class="flex justify-center rounded-xl bg-sky-700/25 w-dvw">
          <ion-accordion-group class="w-full" expand="inset">
    <ion-accordion value="first" class="w-full" >
      <ion-item slot="header" class="rounded">
        <ion-label>Ver todos los expertos</ion-label>
      </ion-item>
      <div class="rounded-2xl ion-padding" slot="content">
        <ul class="rounded-2xl">
          <li 
            v-for="(expert, index) in experts" 
            :key="index"  
            class="p-3 mb-2 text-center bg-emerald-600 rounded-md transition-colors animate-fade hover:bg-emerald-700 hover:cursor-pointer"
           @click="getExpertSelection(expert.name)"
          >
            <div class="text-lg font-medium">{{ expert.name }}</div>
            <div class="italic">{{ expert.summary }}</div>
            <div class="p-1 my-1 text-sm font-semibold text-emerald-600 bg-white rounded-lg opacity-90 font-inter">{{ expert.specialty }}</div>
          </li>
        </ul>
      </div>
      
    </ion-accordion>
   
  </ion-accordion-group>
        </div>
        
  </section>



  <!-- Video & Sobre Nosotros -->
  <section class="px-4 py-12">
  <div class="flex flex-col gap-8 items-center mx-auto max-w-6xl md:flex-row">
    <div class="space-y-6 md:w-1/2">
      <h2 class="p-3 text-3xl font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl">
        ¿Por qué elegir a nuestros expertos?
      </h2>
      <p class="leading-relaxed text-gray-600">
        Nuestros profesionales están comprometidos con brindarte un servicio a medida, respondiendo a tus dudas y ayudándote a lograr tus objetivos de manera rápida y eficiente.
      </p>
      <a href="/contact" class="inline-block px-8 py-3 font-medium text-white bg-blue-600 rounded-lg shadow transition duration-300 hover:bg-blue-700">
        Contáctanos
      </a>
    </div>
    <div class="md:w-1/2">
      <img src="../assets/img/expertChoose.jpg" alt="Expertos en acción" class="object-cover w-full h-auto rounded-xl shadow-xl">
    </div>
  </div>
</section>

<!-- popup that shows expert info (if there is more than one expert selected, it also shows a list of experts) -->
 <section v-if="expertPopup" @click.self="toggleExpertPopup('close')" class="flex overflow-auto fixed top-0 left-0 z-50 justify-center items-center px-2 w-full h-full bg-black bg-opacity-30 animate-fade animate-duration-300">
  <div @click.stop class="overflow-auto p-6 bg-white rounded-lg shadow-lg max-h-[80vh]">
    <PrevInfoComponent/> 
    <PrevInfoComponent/> 
    <PrevInfoComponent/> 
    <PrevInfoComponent/> 
    <PrevInfoComponent/> 
    <PrevInfoComponent/> 
    <PrevInfoComponent/> 
    <PrevInfoComponent/> 
  </div>
 </section>

 <!-- Expertos Más Consultados -->
 <section id="expertos" class="py-16 bg-white">
    <div class="container px-6 mx-auto">
      <h2 class="mb-12 text-3xl font-bold text-center text-emerald-600 font-inter">Expertos Más Consultados</h2>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Card 1 -->
        <div class="overflow-hidden bg-gray-50 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
          <img src="../assets/img/exportImg.jpg" alt="Importación y Exportación" class="object-cover w-full h-48">
          <div class="p-6">
            <h3 class="mb-3 text-2xl font-semibold text-emerald-600 font-inter">Importación y Exportación</h3>
            <p class="mb-4 text-gray-600 font-inter">
              Facilitamos el intercambio de bienes y servicios a nivel internacional con normativas seguras.
            </p>
            <button @click="getExpertSelection('Importación y Exportación')" class="px-4 py-2 font-medium text-white bg-emerald-600 rounded bg-emerald-4hover:00 font-inter">
              Consultar
            </button>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="overflow-hidden bg-gray-50 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
          <img src="../assets/img/categoria-2.jpg" alt="Asesorías Legales" class="object-cover w-full h-48">
          <div class="p-6">
            <h3 class="mb-3 text-2xl font-semibold text-emerald-600 font-inter">Asesorías Legales</h3>
            <p class="mb-4 text-gray-600 font-inter">
              Abogados expertos para ofrecer asesoría y representación en procesos judiciales y administrativos.
            </p>
            <button @click="getExpertSelection('Asesorías Legales')" class="px-4 py-2 font-medium text-white bg-emerald-600 rounded bg-emerald-4hover:00 font-inter">
              Consultar
            </button>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="overflow-hidden bg-gray-50 rounded-xl shadow-md transition duration-300 hover:shadow-xl">
          <img src="../assets/img/categoria-3.jpg" alt="Médico" class="object-cover w-full h-48">
          <div class="p-6">
            <h3 class="mb-3 text-2xl font-semibold text-emerald-600 font-inter">Médico</h3>
            <p class="mb-4 text-gray-600 font-inter">
              Profesionales de la salud comprometidos en atender tus necesidades médicas de forma personalizada.
            </p>
            <button @click="getExpertSelection('Médico')" class="px-4 py-2 font-medium text-white bg-emerald-600 rounded bg-emerald-4hover:00 font-inter">
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>



  <!-- Áreas de Especialización -->
  <section class="py-16 bg-gray-100">
    <div class="container px-6 mx-auto">
      <h2 class="mb-12 text-3xl font-bold text-center text-emerald-600 font-inter">Áreas de Especialización</h2>
      <section class="py-16 bg-gray-100">
    <div class="container px-6 mx-auto">
      <h2 class="mb-12 text-3xl font-bold text-center text-emerald-600 font-inter">Áreas de Especialización</h2>
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
        <SpecializationCard
          v-for="(specialization, index) in specializations"
          :key="index"
          :title="specialization.title"
          :description="specialization.description"
          :image="specialization.image"
          @click="getExpertSelection(specialization.title)"
        />
      </div>
    </div>
  </section>
    </div>
  </section>

  <!-- Call To Action -->
  <section id="contacto" class="py-16 text-white bg-gradient-to-r from-green-600 to-emerald-700">
    <div class="container px-6 mx-auto text-center">
      <h2 class="mb-4 text-3xl font-bold font-inter">¿Listo para empezar?</h2>
      <p class="mb-8 text-lg font-inter">
        Conéctese ahora y encuentre el experto que necesita, de manera rápida y eficiente.
      </p>
      <button class="px-8 py-3 font-medium text-emerald-600 bg-white rounded-full shadow-lg transition duration-300 hover:bg-gray-100 font-inter">
        Empezar Contacto
      </button>
    </div>
  </section>

  <!-- Testimoniales -->
  <section class="py-16 bg-gray-50">
    <div class="container px-6 mx-auto">
      <h2 class="mb-12 text-3xl font-bold text-center text-emerald-600 font-inter">Testimoniales</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="p-6 bg-white rounded-2xl shadow-md">
          <p class="mb-4 italic text-gray-600 font-inter">
            <i class="fas fa-quote-left"></i> La ayuda que recibí fue rápida, eficiente y totalmente adaptada a mis necesidades. <i class="fas fa-quote-right"></i>
          </p>
          <p class="font-semibold text-right text-gray-700 font-inter">Jorge Ahumada, Estudiante</p>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow-md">
          <p class="mb-4 italic text-gray-600 font-inter">
            <i class="fas fa-quote-left"></i> Gracias a la asesoría en comercio exterior pude impulsar mi negocio de forma notable. <i class="fas fa-quote-right"></i>
          </p>
          <p class="font-semibold text-right text-gray-700 font-inter">Carlos Montiel, Empresario</p>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow-md">
          <p class="mb-4 italic text-gray-600 font-inter">
            <i class="fas fa-quote-left"></i> La prueba de 15 minutos me ayudó a decidir rápidamente y con total confianza. <i class="fas fa-quote-right"></i>
          </p>
          <p class="font-semibold text-right text-gray-700 font-inter">Vanessa Cervantes, RRHH</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Publicidad -->
  <section class="py-16">
    <div class="container px-6 mx-auto">
      <h2 class="mb-12 text-3xl font-bold text-center text-emerald-600 font-inter">Publicidad</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <fieldset class="p-6 rounded-2xl border">
          <legend class="mb-4 text-2xl font-bold text-emerald-600 font-inter">miexpareja.net</legend>
          <p class="mb-4 text-gray-600 font-inter">
            Descubre cómo las experiencias del pasado pueden ayudarte a conocer mejor a esa persona especial.
          </p>
          <button class="px-4 py-2 font-medium text-white bg-emerald-400 rounded-lg hover:bg-emerald-600 font-inter">
            Ir al sitio
          </button>
        </fieldset>
        <fieldset class="p-6 rounded-2xl border">
          <legend class="mb-4 text-2xl font-bold text-emerald-600 font-inter">miarrendatario.com</legend>
          <p class="mb-4 text-gray-600 font-inter">
            Encuentra la propiedad perfecta conociendo de antemano a inquilinos y dueños.
          </p>
          <button class="px-4 py-2 font-medium text-white bg-emerald-400 rounded-lg hover:bg-emerald-600 font-inter">
            Ir al sitio
          </button>
        </fieldset>
      </div>
    </div>
  </section>

  <div class="container flex flex-col gap-3 items-center px-6 py-12 mx-auto text-white">
    <p class="mb-4 font-inter">Página certificada con seguridad SSL</p>
    <img src="../assets/img/SSL-certificado.png" alt="Certificado SSL" class="mx-auto w-32">
    <ion-button
    router-link="/tabs/tab1"
    class="px-4 py-2 font-medium text-white font-inter"
    color="primary"
    fill="solid"
    >
      Volver al inicio
    </ion-button>
  </div>
</ion-content>

</ion-page>

</template>

<script lang="ts" setup>
import PrevInfoComponent from '@/components/Expert/PrevInfoComponent.vue';
import SpecializationCard from '@/components/ExpertList/SpecializationCard.vue';
import { userStore } from '@/store/user';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/vue';
import { collection, getFirestore } from 'firebase/firestore';
import { ref } from 'vue';


const db = getFirestore();
const usersCollection = collection(db, 'users');

const setUserStore = (name: string, category: string, id: string) => {
 //due to pinia store is still not available this function is not implemented and only console.log is used
 console.log(name, category, id);
};

// Import images
import calculadoraImg from '../assets/img/calculadora.jpg';
import arquitectoImg from '../assets/img/arquitecto-categoria.jpg';
import webImg from '../assets/img/web-categoria.jpg';
import publicidadImg from '../assets/img/publicidad-categoria.jpg';
import traductorImg from '../assets/img/traductor-categoria.jpg';
import peritajeImg from '../assets/img/peritaje-categoria.jpg';
import computacionImg from '../assets/img/computacion-categoria.jpg';
import gestoriaImg from '../assets/img/gestoria-categoria.jpg';
import marketingImg from '../assets/img/marketing-categoria.jpg';
import lawImg from '../assets/img/law.jpg';
import psychologistImg from '../assets/img/psychologist.jpg';
import teacherImg from '../assets/img/teacher.jpg';
import chefImg from '../assets/img/chef.jpg';

const specializations = ref([
  {
    title: "Contador",
    description: "Expertos en contabilidad para gestionar tus finanzas de forma precisa y confiable.",
    image: calculadoraImg
  },
  {
    title: "Arquitecto",
    description: "Diseño y planificación de espacios con profesionalismo y creatividad.",
    image: arquitectoImg
  },
  {
    title: "Servicios Web",
    description: "Desarrollo de soluciones digitales a medida para potenciar tu presencia online.",
    image: webImg
  },
  {
    title: "Publicidad",
    description: "Estrategias creativas para difundir y potenciar la imagen de tu marca.",
    image: publicidadImg
  },
  {
    title: "Traductores",
    description: "Especialistas en comunicación multilingüe para romper barreras idiomáticas.",
    image: traductorImg
  },
  {
    title: "Peritaje",
    description: "Evaluaciones técnicas y profesionales con rigor y precisión.",
    image: peritajeImg
  },
  {
    title: "Ingeniería en Computación",
    description: "Innovación tecnológica y desarrollo de sistemas a la vanguardia.",
    image: computacionImg
  },
  {
    title: "Gestoría en Trámites",
    description: "Optimiza tus gestiones administrativas con asesorías especializadas.",
    image: gestoriaImg
  },
  {
    title: "Marketing",
    description: "Conecta con tu audiencia a través de estrategias innovadoras y efectivas.",
    image: marketingImg
  },
  {
    title: "Abogado",
    description: "Conecta con un abogado especializado para recibir asesoría legal directa y resolver tus asuntos jurídicos.",
    image: lawImg
  },
  {
    title: "Psicólogo/a",
    description: "Asesoría psicológica para resolver tus dudas y resolver tus problemas.",
    image: psychologistImg
  },
  {
    title: "Maestro",
    description: "Asesoría educativa para resolver tus dudas y resolver tus problemas.",
    image: teacherImg
  },
  {
    title: "Chef",
    description: "Asesoría culinaria para resolver tus dudas y resolver tus problemas.",
    image: chefImg
  }
]);


const experts = ref([
  {
    name: "Luis Ángel Suárez",
    specialty: "Importación y Exportación",
    description: "Facilitamos el intercambio de bienes y servicios a nivel internacional con normativas seguras.",
    image: "../assets/img/categoria-1.jpg",
    rating: 4.8,
    summary: "Experto en comercio internacional con más de 10 años de experiencia."
  },
  {
    name: "Mario López Gómez",
    specialty: "Asesorías Legales",
    description: "Abogados expertos para ofrecer asesoría y representación en procesos judiciales y administrativos.",
    image: "../assets/img/categoria-2.jpg",
    rating: 4.5,
    summary: "Abogado especializado en derecho corporativo y litigios."
  },
  {
    name: "Luis Ángel Suárez",
    specialty: "Médico",
    description: "Profesionales de la salud comprometidos en atender tus necesidades médicas de forma personalizada.",
    image: "../assets/img/categoria-3.jpg",
    rating: 4.9,
    summary: "Médico con especialización en medicina interna y atención primaria."
  },
  {
    name: "Angela Ruiz Martinez",
    specialty: "Contador",
    description: "Expertos en contabilidad para gestionar tus finanzas de forma precisa y confiable.",
    image: "../assets/img/calculadora.jpg",
    rating: 4.7,
    summary: "Contador público con experiencia en auditoría y finanzas."
  },
  {
    name: "Alberto Jimenez Castro",
    specialty: "Arquitecto",
    description: "Diseño y planificación de espacios con profesionalismo y creatividad.",
    image: "../assets/img/arquitecto-categoria.jpg",
    rating: 4.6,
    summary: "Arquitecto con enfoque en diseño sostenible y planificación urbana."
  },
  {
    name: "Carlos Ignacio Beltrán",
    specialty: "Servicios Web",
    description: "Desarrollo de soluciones digitales a medida para potenciar tu presencia online.",
    image: "../assets/img/web-categoria.jpg",
    rating: 4.8,
    summary: "Desarrollador web full-stack con experiencia en tecnologías modernas."
  },
  {
    name: "Bryan Juarez Mendoza",
    specialty: "Publicidad",
    description: "Estrategias creativas para difundir y potenciar la imagen de tu marca.",
    image: "../assets/img/publicidad-categoria.jpg",
    rating: 4.4,
    summary: "Especialista en marketing digital y publicidad creativa."
  },
  {
    name: "Luis Miguel Acosta",
    specialty: "Traductores",
    description: "Especialistas en comunicación multilingüe para romper barreras idiomáticas.",
    image: "../assets/img/traductor-categoria.jpg",
    rating: 4.7,
    summary: "Traductor certificado con dominio en múltiples idiomas."
  },
  {
    name: "Roberto Gutierrez Olguín",
    specialty: "Peritaje",
    description: "Evaluaciones técnicas y profesionales con rigor y precisión.",
    image: "../assets/img/peritaje-categoria.jpg",
    rating: 4.5,
    summary: "Perito con experiencia en evaluaciones técnicas y forenses."
  },
  {
    name: "Dana Mora Durán",
    specialty: "Ingeniería en Computación",
    description: "Innovación tecnológica y desarrollo de sistemas a la vanguardia.",
    image: "../assets/img/computacion-categoria.jpg",
    rating: 4.9,
    summary: "Ingeniero en computación con especialización en inteligencia artificial."
  },
  {
    name: "Rodrigo Vallencia Mendoza",
    specialty: "Gestoría en Trámites",
    description: "Optimiza tus gestiones administrativas con asesorías especializadas.",
    image: "../assets/img/gestoria-categoria.jpg",
    rating: 4.6,
    summary: "Gestor administrativo con experiencia en trámites gubernamentales."
  },
  {
    name: "Jorge Salinas Gutierrez",
    specialty: "Marketing",
    description: "Conecta con tu audiencia a través de estrategias innovadoras y efectivas.",
    image: "../assets/img/marketing-categoria.jpg",
    rating: 4.7,
    summary: "Especialista en marketing estratégico y análisis de mercado."
  },
  {
    name: "Miguel Hernandez Campos",
    specialty: "Abogado",
    description: "Conecta con un abogado especializado para recibir asesoría legal directa y resolver tus asuntos jurídicos.",
    image: "../assets/img/law.jpg",
    rating: 4.8,
    summary: "Abogado con experiencia en derecho penal y familiar."
  },
  {
    name: "Gabriel Navarro Valdez",
    specialty: "Psicólogo/a",
    description: "Asesoría psicológica para resolver tus dudas y resolver tus problemas.",
    image: "../assets/img/psychologist.jpg",
    rating: 4.9,
    summary: "Psicólogo clínico con enfoque en terapia cognitivo-conductual."
  },
  {
    name: "Emilio Soto Ruíz",
    specialty: "Maestro",
    description: "Asesoría educativa para resolver tus dudas y resolver tus problemas.",
    image: "../assets/img/teacher.jpg",
    rating: 4.6,
    summary: "Educador con experiencia en pedagogía y desarrollo curricular."
  },
  {
    name: "Emilio Florez García",
    specialty: "Chef",
    description: "Asesoría culinaria para resolver tus dudas y resolver tus problemas.",
    image: "../assets/img/chef.jpg",
    rating: 4.7,
    summary: "Chef profesional con especialización en cocina internacional."
  }
]);

const getExpertSelection = (expert:string) => {
  toggleExpertPopup('open');
}

const expertPopup = ref(false);

const toggleExpertPopup = (action: 'open' | 'close') => (action) === 'open' ? expertPopup.value = true : expertPopup.value = false;

</script>

<style scoped>

</style>