<template>
  <div>
    <div v-if="map.map !== ''" class="map__bussiness--content">
      <p class="font-semibold">Vị trí công ty</p>
      <div class="w-full h-auto">
        <iframe
          :src="map.map"
          width="600"
          height="450"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full h-[300px] object-cover"
        ></iframe>
      </div>
    </div>
    <div v-else class="map__bussiness--content">
      <a :href="map.link"
        ><img :src="map.image" :href="map.link" alt="Ảnh minh họa" class="h-auto w-full object-cover"
      /></a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    mapCompany: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const { mapCompany: map } = props
    return { map }
  }
})
</script>

<style scoped>
.map__bussiness--content {
  @apply flex flex-col gap-4 p-4 border border-primary rounded-xl w-full;
}
</style>
