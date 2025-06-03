<template>
    <div class="">
        <span v-for="(name, index) in currentName" :key="index" class="animate-fade">{{ name }}</span>
    </div>
</template>

<script lang="ts" setup>
import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { ref } from 'vue';
const names = ref(
    [
        ['consulta', 'gratis', 'en', 'linea', '.com'],
        ['consulta', 'experto','.com'],
        ['consulta', 'especializada','.com']
    ]
)

const currentName = ref(names.value[0]);

let timeoutId: NodeJS.Timeout | null = null;
const changeName = () => {
    //validate if is there an active animation 
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * names.value.length);
        currentName.value = names.value[randomIndex];
    }, 2000);
}

onIonViewDidEnter(() => {
    changeName();
})

onIonViewDidLeave(() => {
    if(timeoutId){
        clearTimeout(timeoutId);
    }
})

</script>

<style scoped>

</style>