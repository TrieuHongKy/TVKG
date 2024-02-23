<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div class="profile__section">
      <div class="flex justify-between mb-2">
        <div class="font-semibold text-lg">
          <USkeleton class="h-4 w-[250px]" />
        </div>
        <div class="profile__language--action">
          <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
        </div>
      </div>
      <div>
        <div class="flex gap-4">
          <div class="profile__language--content">
            <span class="text-base md:w-4/5">
              <USkeleton class="h-4 w-[250px]" />
            </span>
            <div class="profile__language--action w-1/5">
              <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
              <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
            </div>
          </div>
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
.profile__language--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__language--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__language--content {
  @apply flex items-center justify-between pb-2 w-full;
}
.profile__language--default {
  @apply text-sm text-green-600 font-medium hover:text-primary cursor-pointer;
}
</style>
