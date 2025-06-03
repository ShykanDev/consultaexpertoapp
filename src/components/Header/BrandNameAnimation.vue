<template>
    <div class="flex gap-1">
      <span 
        v-for="(word, index) in currentName" 
        :key="index" 
        class="inline-block transition-opacity duration-300"
        :class="word.includes('.') ? 'text-sky-500' : ''"
      >
        {{ word }}
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { 
    onIonViewDidEnter, 
    onIonViewWillLeave,
    onIonViewDidLeave
  } from '@ionic/vue';
  
  const names = [
    ['consulta', 'gratis', 'en', 'linea', '.com'],
    ['consulta', 'experto', '.com'],
    ['consulta', 'especializada', '.com']
  ];
  
  const currentName = ref<string[]>(names[0]);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  const startAnimation = () => {
    const changeName = () => {
      timeoutId = setTimeout(() => {
        const currentIndex = names.findIndex(name => 
          JSON.stringify(name) === JSON.stringify(currentName.value)
        );
        const nextIndex = (currentIndex + 1) % names.length;
        currentName.value = names[nextIndex];
        changeName(); // Siguiente iteración
      }, 2000);
    };
    
    // Iniciar la animación
    changeName();
  };
  
  const stopAnimation = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  
  // Cuando la vista está a punto de entrar
  onIonViewDidEnter(() => {
    startAnimation();
  });
  
  // Cuando la vista está a punto de salir
  onIonViewWillLeave(() => {
    stopAnimation();
  });
  
  // Cuando la vista ya salió
  onIonViewDidLeave(() => {
    stopAnimation();
  });
  </script>λ