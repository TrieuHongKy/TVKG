<template>
  <div class="flex gap-2">
    <nuxt-link :to="user?.user_type === 'company' ? '/company/' + company?.slug : '/profile/' + user?.id">
      <UAvatar size="lg" :src="user?.image" :alt="user?.name" />
    </nuxt-link>
    <div class="info">
      <div class="text-left">
        <p class="truncate font-medium text-base text-gray-900 dark:text-white">
          {{ user?.name }}
        </p>
        <UBadge size="sm">{{ user?.user_type === 'company' ? 'Doanh nghiệp' : 'Ứng viên' }}</UBadge>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['user'],
  setup() {
    const { company } = storeToRefs(useCompanyStore())
    return { company }
  }
})
</script>

<style scoped></style>
