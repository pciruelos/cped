<template>
  <div class="relative h-[500px] overflow-hidden">
    <transition name="fade" mode="out-in">
      <div v-if="currentImage" :key="currentImage" class="absolute inset-0">
        <img :src="currentImage" alt="Background Image" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black opacity-50"></div> <div class="absolute inset-0 flex items-center justify-center">
          <h1 class="text-6xl font-bold text-white">Bienvenidos!</h1>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import One from '../assets/Pics/Slider/fondo1.jpg';
import Two from '../assets/Pics/Slider/2.jpg';
import Three from '../assets/Pics/Slider/3.jpg';

const images = [One, Two, Three];
const currentImageIndex = ref(0);

const currentImage = computed(() => images[currentImageIndex.value]);

onMounted(() => {
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  }, 10000); // Changed to 10000ms for 10 seconds
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease; /* Adjust duration as needed */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>