<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <v-icon name="md-login-round" />
          <ion-label>Login</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <v-icon name="io-person-add-sharp" />
          <ion-label>Registrarse</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="authStore().getIsAuth" tab="tab3" href="/tabs/experts-list">
          <v-icon name="md-listalt-round" />
          <ion-label>Ver Expertos</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { authStore } from '@/store/auth';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';





</script>
