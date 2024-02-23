<template>
  <div>
    <widget-contact></widget-contact>
    <map-contact></map-contact>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContactPage',
  setup() {
    useHead({
      title: 'Liên hệ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Contact page of website'
        }
      ]
    })
  }
})
</script>
