import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import './index.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
/*import '@ionic/vue/css/palettes/dark.system.css';*/

/* Theme variables */
import './theme/variables.css';

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, BiClipboard2CheckFill ,

  FaBalanceScale,
  FaUserMd,
  FaCalculator,
  FaBuilding,
  FaLaptopCode,
  FaBullhorn,
  FaLanguage,
  FaSearch,
  FaCog,  
  FaFileAlt,
  FaChartLine,
  FaGavel,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUtensils,
  OiTasklist,
  MdLoginRound,
  FaUserEdit,
  BiShieldLockFill,
  RiUser2Fill,
  MdEmail,
  MdPasswordRound,
  MdCalendarmonth,
  MdSettings,
  IoPersonAddSharp,
  BiInfoSquareFill,
  LaUserTieSolid,
  MdListaltRound,
  BiPersonBadge, 
  HiSolidUserCircle, 
  BiCalendar, 
  BiSendCheck, 
  BiPatchQuestion,
  IoStar, 
  FaEnvelope, 
  BiCalendarCheck, 
  MdWorkspacesfilled,
  RiShieldUserFill,
  BiCalendar2Minus,
  BiBriefcase,
  MdArrowbackiosnewRound,
  IoClose,
  HiLogin,
  HiUserAdd
} from "oh-vue-icons/icons";
addIcons(FaFlag, RiZhihuFill, BiClipboard2CheckFill,
  FaBalanceScale,
  FaUserMd,
  FaCalculator,
  FaBuilding,
  FaLaptopCode,
  FaBullhorn,
  FaLanguage,
  FaSearch,
  FaCog,
  FaFileAlt,
  FaChartLine,
  FaGavel,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUtensils,
  OiTasklist,
  MdLoginRound,
  FaUserEdit,
  BiShieldLockFill,
  RiUser2Fill,
  MdEmail,
  MdPasswordRound,
  MdCalendarmonth,
  MdSettings,
  IoPersonAddSharp,
  BiInfoSquareFill,
  LaUserTieSolid,
  MdListaltRound,
  BiPersonBadge, 
  HiSolidUserCircle, 
  BiCalendar, 
  BiSendCheck, 
  BiPatchQuestion,
  IoStar,
  FaEnvelope,
  BiCalendarCheck,
  MdWorkspacesfilled,
  RiShieldUserFill,
  BiCalendar2Minus,
  BiBriefcase,
  MdArrowbackiosnewRound,
  IoClose,
  HiLogin,
  HiUserAdd
);

import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1Lz0ciKRt-JSioyOVnKG4F-DPLVaGxRI",
  authDomain: "consulta-gratis-en-linea.firebaseapp.com",
  projectId: "consulta-gratis-en-linea",
  storageBucket: "consulta-gratis-en-linea.firebasestorage.app",
  messagingSenderId: "577654296577",
  appId: "1:577654296577:web:1f925fd2343d97c5acb000",
  measurementId: "G-CSNSTN8SVM"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

// Configuración de la StatusBar
const setStatusBar = async () => {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setBackgroundColor({ color: '#1e40af' });
    await StatusBar.setStyle({ style: Style.Dark });
  }
};
//El usuario deberá tener un estado de la cita (confirmada/por confirmar) (Cliente)
//Para el experto debera confirmar primeramente la cita 
const app = createApp(App)
  .component("v-icon", OhVueIcon)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .component('VueDatePicker', VueDatePicker);

// Asegurarse de que la StatusBar se configure antes de montar la aplicación
setStatusBar().then(() => {
  router.isReady().then(() => {
    app.mount('#app');
  });
});
