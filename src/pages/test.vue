<template>
  <!-- ● 狗狗適性測驗頁面 pages/test.vue -->
  <section id="test" class="test">
    <v-container>
      <sectionTitle title="狗狗適性測驗" enTitle="TEST"></sectionTitle>
    </v-container>
  </section>

</template>



<script setup>
import { ref, computed, onMounted } from "vue"
import { definePage } from 'vue-router/auto'
import { useSnackbar } from 'vuetify-use-dialog'
import { useDisplay } from 'vuetify';
import { useApi } from '@/composables/axios'
import sectionTitle from '@/components/sectionTitle.vue'




definePage({
  meta: {
    title: 'Dost | 適性測驗',
    login: false,
    admin: false
  }
})


const display = useDisplay();

</script>