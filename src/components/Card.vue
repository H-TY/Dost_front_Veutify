<template>
  <v-container class="d-flex pa-0 mx-7 justify-center">
    <v-sheet class="bg-transparent borderColor hoverStatus" width="120">
      <router-link class="text-decoration-none text-light-blue-darken-1" :to="to">
        <v-row class="flex-column ma-0">
          <v-col class="d-flex justify-center">
            <v-icon :icon="icon" size="52"></v-icon>
          </v-col>
          <v-col class="d-flex justify-center pt-0">
            <p>{{ text }}</p>
          </v-col>
        </v-row>
      </router-link>
    </v-sheet>
  </v-container>
</template>



<script setup>
const props = defineProps(['to', 'text', 'icon'])


</script>



<style scoped>
/* 大選項外框顏色 */
.borderColor{
  border: 4px solid #039BE5;
  border-radius: 12px;
}

.hoverStatus{
  width: 100%;
  height: 100%;

  :hover{
    font-weight: 800;
    color: white;
    background-color: #039BE5;
    border: none;
  }
}


</style>