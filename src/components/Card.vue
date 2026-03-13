<template>
  <v-card :to="to">
    <div class="card-title">
      <v-icon :icon="icon"></v-icon>
      <h6>{{ text }}</h6>
    </div>
    <p>{{ desc }}</p>
  </v-card>
</template>



<script setup>
const props = defineProps(['to', 'text', 'desc', 'icon'])

</script>