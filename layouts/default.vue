<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <div>
    <nuxt-loading-bar :duration="1000" />
    <Header></Header>
    <UNotifications />
    <div class="py-6"><slot /></div>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
