<template>
  <!-- LOGIN -->
  
  <ion-page class="animate-fade-right">
    <!-- Header Top Left-->
    <ion-header>
      <ion-toolbar >
        <ion-title class="text-xl font-bold text-sky-700 font-quicksand">Inicio de Sesión</ion-title>
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
