<template>
  <ion-page>
    <ion-header >
      <ion-toolbar >
        <ion-title class="text-xl font-bold text-orange-800 font-quicksand">Registrarse</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar color="secondary">
          <ion-title size="large">Registrarse</ion-title>
        </ion-toolbar>
      </ion-header>

      <RegisterComponent></RegisterComponent>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import RegisterComponent from '@/components/Login/RegisterComponent.vue';
</script>

<style scoped>
:root {
  --ion-color-primary: ;
}
</style>

