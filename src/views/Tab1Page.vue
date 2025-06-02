<template>
  <!-- LOGIN -->
  
  <ion-page class="animate-fade-right">
    <!-- Header Top Left-->
    <ion-header>
      <ion-toolbar >
        <div class="flex justify-between items-center pr-3 w-full">
          <ion-title class="text-base font-bold text-sky-700 sm:text-xl font-quicksand">Inicio de Sesión</ion-title>
          <span class="flex text-sm font-semibold text-sky-700 font-quicksand">
<span>consulta</span>
<span class="text-sky-500">gratis</span>
<span>en</span>
<span>linea</span>
<span class="text-sky-500">.com</span>
          </span>
          </div>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

   
      <div class="flex justify-center w-full ion-padding">
        <LoginComponent />
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import LoginComponent from '@/components/Login/LoginComponent.vue';
import { onIonViewDidEnter,
  onIonViewWillEnter,
  onIonViewWillLeave,
  onIonViewDidLeave } from '@ionic/vue';



onIonViewDidEnter(() => {
  console.log('Component ViewDidEnter (similar to mounted)');

})

onIonViewWillEnter(() => {
  console.log('Component ViewWillEnter (similar to beforeMount)');
})

onIonViewWillLeave(() => {
  console.log('Component ViewWillLeave (similar to beforeUnmount)');
})

onIonViewDidLeave(() => {
  console.log('Component ViewDidLeave (similar to unmounted)');
})
</script>

<style scoped>

</style>
