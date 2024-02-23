<template>
  <div>
    <div class="profile__section">
      <div class="flex justify-between mb-2">
        <div class="font-semibold text-lg">
          <div class="text-lg">
            <USkeleton class="h-4 w-3/4 md:w-[400px]" />
          </div>
        </div>
        <div class="profile__skill--action">
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
        </div>
      </div>
      <div class="profile__skill--content">
        <div v-for="(sk, index) in 6" :key="index">
          <USkeleton class="h-4 w-[80px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
.profile__skill--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__skill--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__skill--content {
  @apply text-center flex flex-wrap gap-2 p-2;
}
.profile__skill--default {
  @apply flex flex-col gap-2 px-4;
}
.profile__skill--add {
  @apply text-sm text-green-600 font-medium hover:text-primary cursor-pointer;
}
</style>
