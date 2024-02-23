<template>
  <nuxt-link to="/" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
    <div class="flex items-center justify-center flex-shrink-0">
      <UAvatar size="md" :src="img" alt="Triệu Hồng Ký" />
    </div>
    <div class="w-full pl-3">
      <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
        <span class="font-semibold text-gray-900 dark:text-white">Trieu Hong Ky</span> vừa đăng 1 bài viết mới
      </div>
      <div class="text-xs text-blue-600 dark:text-blue-500">vài phút trước</div>
    </div>
  </nuxt-link>
  <nuxt-link to="/" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
    <div class="flex items-center justify-center flex-shrink-0">
      <UAvatar size="md" :src="img" alt="Triệu Hồng Ký" />
    </div>
    <div class="w-full pl-3">
      <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
        <span class="font-semibold text-gray-900 dark:text-white">Triệu Hồng Ký </span> và
        <span class="font-medium text-gray-900 dark:text-white"> 5 người khác</span> đã bắt đầu theo dõi bạn.
      </div>
      <div class="text-xs text-blue-600 dark:text-blue-500">10 phút trước</div>
    </div>
  </nuxt-link>
  <nuxt-link to="/" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
    <div class="flex items-center justify-center flex-shrink-0">
      <UAvatar size="md" :src="img" alt="Triệu Hồng Ký" />
    </div>
    <div class="w-full pl-3">
      <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
        <span class="font-semibold text-gray-900 dark:text-white">Triệu Hồng Ký</span> và
        <span class="font-medium text-gray-900 dark:text-white">141 người khác</span> đã thích bài viết của bạn.
      </div>
      <div class="text-xs text-blue-600 dark:text-blue-500">44 phút trước</div>
    </div>
  </nuxt-link>
  <nuxt-link to="/" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
    <div class="flex items-center justify-center flex-shrink-0">
      <UAvatar size="md" :src="img" alt="Avatar" />
    </div>
    <div class="w-full pl-3">
      <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
        <span class="font-semibold text-gray-900 dark:text-white">Triệu Hồng Ký</span> đã nhắc đến bạn trong một bình
        luận: <span class="font-medium text-blue-500" href="#">@huthoine</span> Bài viết này hay
      </div>
      <div class="text-xs text-blue-600 dark:text-blue-500">1 hour ago</div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const img =
      'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/356370275_1369156040328686_1512000547606765485_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qMk89NFhJAwAX9a8MBf&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfATJC9WDF4EpnxY7OWnvMNuUTkkLvZWtv06-WrQyKn-Dg&oe=65437C73'

    return { img }
  }
})
</script>

<style scoped></style>
