<template>
  <!-- LOGIN -->
  
  <ion-page class="animate-fade-right">
    <!-- Header Top Left-->
    <ion-header>
      <ion-toolbar color="#08abfc" class="bg-sky-700 bg-gradient-to-r via-emerald-700 from to-sky-950">
        <ion-title class="text-xl font-bold text-white font-quicksand">Inicio de Sesión</ion-title>
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



</script>

<style scoped>

</style>
