<template>
    <div class="relative w-full ion-padding">

      <!--Section to see what is the user selection (when user clicks on the experts list )-->
      <section class="fixed w-full">

      </section>
     

      <aside v-if="userSelection" class="p-2 text-sky-600 rounded-xl border border-sky-600 shadow-md">
        <h4>Inicie sesión para consultar un experto <span class="font-bold text-white bg-sky-600 rounded">{{ userSelection }}</span></h4>
      </aside>

      <div class="px-4 py-8 mx-auto max-w-8xl md:px-8">
  <div class="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
    <div class="order-2 space-y-6 md:order-1">

      <h2 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-600 md:text-4xl">
        Su plataforma para consultar un experto:
      </h2>

      <div class="flex relative gap-2 justify-center items-center mt-6">
        <h3 
          class="hidden px-6 py-4 text-xl font-semibold text-white bg-gradient-to-r rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 animate-fade-in from-sky-600/90 to-blue-600/90 font-quicksand md:text-2xl"

        >
          <div class="flex gap-3 items-center">
            <span  class="animate-fade" :key="currentExpert">{{ experts[currentExpert].name }}     <v-icon color="white" class="animate-fade" :key="currentExpert" :name="experts[currentExpert].icon" scale="1.5" /></span>            
          </div>
        </h3>
        <div class="flex justify-center rounded-xl bg-sky-700/25 w-dvw">
          <ion-accordion-group class="w-full" expand="inset">
    <ion-accordion value="first" class="w-full" >
      <ion-item slot="header" class="rounded">
        <ion-label>Ver todos los expertos</ion-label>
      </ion-item>
      <div class="rounded-2xl ion-padding" slot="content">
        <ul class="rounded-2xl">
          <!--Adding a emerald bg to the li that matches the current expert-->
          <li v-for="(expert, index) in experts" :key="index" @click="setUserSelection(expert.name)" class="p-1 mb-1 rounded-md animate-fade hover:cursor-pointer" :class="{
            
            'bg-blue-700 text-white p-1 rounded-lg' : expert.name == experts[currentExpert].name, 

           'bg-sky-500/25' : expert.name != experts[currentExpert].name, 

           'bg-emerald-500/55 text-blue-600 font-black text-base italic' : expert.name == userSelection 
           }" >{{ 
            (expert.name.includes('en'))  ? expert.name.replace(/en/, '') : expert.name}}</li>
        </ul>
      </div>
    </ion-accordion>
   
  </ion-accordion-group>
        </div>
        
      </div>
    </div>
  </div>
</div>




      <div class="flex flex-col justify-center items-center">
        <h1 class="font-sans text-2xl">Bienvenido</h1>
        <p class="text-slate-800 font-quicksand">Inicie sesión para continuar</p>
      </div>

       <!-- Secciones nuevas agregadas al final -->
    <div class="expert-info">
     
      <p class="professional-text font"> <v-icon name="oi-tasklist" /> Gestionaremos sus consultas y le proporcionaremos un experto calificado acorde a sus necesidades específicas.</p>
    </div>
  
      <div class="flex justify-center">
   
      </div>
    <!-- Versión más sutil de la consulta gratis -->
    <div class="flex justify-center">

      <p class="p-2 font-medium text-emerald-800 rounded-2xl bg-emerald-400/45">¿Primera vez aquí? Pruebe nuestra <strong>consulta inicial sin costo</strong> (15 minutos)</p>
    </div>

      <ion-list class="form-container">
        <!-- Email Input -->
        <ion-item class="input-item font-quicksand">
          <ion-icon :icon="mail" slot="start" class="text-sky-700 input-icon"></ion-icon>
          <ion-input 
            v-model="email"
            label="Correo electrónico" 
            label-placement="floating"
            placeholder="tucorreo@example.com" 
            type="email"
            class="custom-input"
          ></ion-input>
        </ion-item>
  
        <!-- Password Input -->
        <ion-item class="input-item">
          <ion-icon :icon="lockClosed" slot="start" class="input-icon"></ion-icon>
          <ion-input 
            v-model="password"
            label="Contraseña" 
            label-placement="floating"
            placeholder="••••••••" 
            :type="showPassword ? 'text' : 'password'"
            class="custom-input"
          ></ion-input>
          <ion-button 
            @click="showPassword = !showPassword"
            fill="clear" 
            slot="end"
            class="password-toggle"
          >
            <ion-icon :icon="showPassword ? eyeOff : eye"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>
  
      <!-- Action Buttons -->
      <div class="actions">
 <ion-button 
   expand="block" 
   @click="login"
   class="login-button"
 >
   Iniciar Sesión
 </ion-button>
        
 <ion-button id="present-alert" fill="outline" size="small" color="secondary">Olvidé mi contraseña</ion-button>
  <ion-alert
  mode="ios"
    trigger="present-alert"
    header="Introduzca su correo"
    :buttons="alertButtons"
    :inputs="alertInputs"
   
  ></ion-alert>
        
      </div>


   

    </div>
    
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { 
    IonItem, 
    IonInput, 
    IonButton, 
    IonList,
    IonIcon ,
    IonAccordion, IonAccordionGroup, IonLabel,
    IonAlert
  } from '@ionic/vue';
  import { 
    mail, 
    lockClosed, 
    eye, 
    eyeOff 
  } from 'ionicons/icons';
  import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { authStore } from '@/store/auth';
  
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  
  //router for ionic to push views 
  const router = useRouter();

  const auth = getAuth();
  
const login = async()=>{           
  try {
   const user = await signInWithEmailAndPassword(auth, email.value, password.value);
   if(!user) {
    console.log('no se logro iniciar sesion');
    return;
   }
    if(user && user.user.email && user.user.uid) { //User is expert
      if(user.user.email == 'awscodeapp@gmail.com'){
    //User is expert, so we dont do nothing here until we implement the expert login
        alert('el usuario es experto');
        return;
      }
      if(user.user.email != 'awscodeapp@gmail.com'){
        authStore().setIsAuth(true); 
      //User is not expert, so we push to the expert list view and set the user name and uid in the store
      authStore().setUserName(user.user.displayName);
      authStore().setUserUid(user.user.uid); 
      router.push('/tabs/experts-list');
      }

    } 
  } catch (error) {
    console.log(error);
  }
}

const experts = ref([
  { name: "Abogado", icon: "fa-balance-scale" },
  { name: "Médico", icon: "fa-user-md" },
  { name: "Contador", icon: "fa-calculator" },
  { name: "Arquitecto", icon: "fa-building" },
  { name: "en Servicios Web", icon: "fa-laptop-code" },
  { name: "en Publicidad", icon: "fa-bullhorn" },
  { name: "Traductor", icon: "fa-language" },
  { name: "en Peritaje", icon: "fa-search" },
  { name: "en Ingeniería en Computación", icon: "fa-cog" },
  { name: "en Gestoría en Trámites", icon: "fa-file-alt" },
  { name: "en Marketing", icon: "fa-chart-line" },
  { name: "Psicólogo/a", icon: "fa-user-graduate" },
  { name: "Maestro", icon: "fa-chalkboard-teacher" },
  { name: "Chef", icon: "fa-utensils" }
]);


const currentExpert = ref(0);

onMounted(() => {
  if (!isSelecting.value) {
  setInterval(() => {
    currentExpert.value++;
    if (currentExpert.value >= experts.value.length) {
      currentExpert.value = 0;
    }

  }, 2000);
}

});

//Is user selecting an expert (boolean)
const isSelecting = ref();

//User selection (expert user selected)
const userSelection = ref();

//Setting the user selection to store on the userSelection ref
const setUserSelection = (expert:string):void => {
  isSelecting.value = true;
  userSelection.value = expert;
}


const resetPasswordEmail = ref()

const alertButtons = [
  {
    text: 'Cancelar',
    role: 'cancel',
    handler: () => {
      console.log('Cancelado')
    }
  },
  {
    text: 'Aceptar',
    handler:  async (data) => {
     try {
      console.log(data[0]);
      
      await sendPasswordResetEmail(auth, data[0])
      console.log('Correo de restablecimiento de contraseña enviado');
     } catch (error) {
      console.log('Error al enviar correo de restablecimiento de contraseña', error);
     }
    }
  }
]


  const alertInputs = [
  {
      type: 'email',
      placeholder: 'correo@ejemplo.com',
      min: 1,
      max: 1000,
    },
  ];

const showInfoExpert = ref(false);

const toggleShowInfoExpert = () => {
  
}


  </script>
  
  <style scoped>
  .container {
    padding: 2rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .header {
    text-align: center;
    margin-bottom: .5rem;
  }
  
  .header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--ion-color-dark);
    margin-bottom: 0.5rem;
  }
  
  .header p {
    color: var(--ion-color-medium);
  }
  
  .form-container {
    background: transparent;
    margin-bottom: 1.5rem;
  }
  
  .input-item {
    --background: var(--ion-color-light);
    --border-radius: 12px;
    --padding-start: 1rem;
    --padding-end: 1rem;
    margin-bottom: 1rem;
  }
  
  .input-icon {
    color: var(--ion-color-medium);
    margin-right: 1rem;
  }
  
  .custom-input {
    --padding-start: 0;
  }
  
  .password-toggle {
    --padding-end: 0;
    color: var(--ion-color-medium);
  }
  
  .login-button {
    --border-radius: 12px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 50px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .forgot-password {
    --color: var(--ion-color-medium);
    text-transform: none;
    font-size: 0.9rem;
  }
  
  .actions {
    text-align: center;
  }
  .welcome{
    color: aqua;
  }
  .expert-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.expert-icon {
  font-size: 3.5rem;
  color: var(--ion-color-primary);
  margin-bottom: 1rem;
}

.expert-title {
  text-align: center;
  font-size: 1.5rem;
  color: var(--ion-color-dark);
  margin: 0;
}

.expert-variable {
  color: var(--ion-color-primary);
  font-weight: 600;
}

.expert-info {
  background: rgba(var(--ion-color-primary-rgb), 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.professional-text {
  text-align: center;
  color: var(--ion-color-dark);
  line-height: 1.4;
  margin: 0;
  font-size: 0.95rem;
}

/* Estilo más sutil para la consulta gratis */
.free-consultation.subtle {
  background: rgba(var(--ion-color-success-rgb), 0.1);
  border: 1px solid rgba(var(--ion-color-success-rgb), 0.2);
  border-radius: 12px;
  padding: 5px;
  text-align: center;
  margin-top: 1.5rem;
}

.free-consultation.subtle .consultation-icon {
  font-size: 1.5rem;
  color: var(--ion-color-success);
  margin-bottom: 0.5rem;
}

.free-consultation.subtle .consultation-text {
  color: var(--ion-color-medium);
  font-size: 0.85rem;
  line-height: 1.3;
  margin: 0;
}

.free-consultation.subtle strong {
  color: var(--ion-color-success);
  font-weight: 500;
}

ion-accordion {
    margin: 0 auto;
  }

  ion-accordion.accordion-expanding,
  ion-accordion.accordion-expanded {
    width: calc(100% - 32px);

    margin: 16px auto;
  }

  ion-accordion.accordion-collapsing ion-item[slot='header'],
  ion-accordion.accordion-collapsed ion-item[slot='header'] {
    --background: var(--ion-color-light);
    --color: var(--ion-color-light-contrast);
  }

  ion-accordion.accordion-expanding ion-item[slot='header'],
  ion-accordion.accordion-expanded ion-item[slot='header'] {
    --background: var(--ion-color-primary);
    --color: var(--ion-color-primary-contrast);
  }
  </style>