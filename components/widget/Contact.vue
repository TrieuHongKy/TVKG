<template>
  <div class="widget--box grid gap-4 grid-cols-1 md:grid-cols-2">
    <div v-for="info in helpWidgets" :key="info.alt" class="widget--content">
      <div class="widget--info">
        <h1 class="widget--title">{{ info.title }}</h1>
        <a class="widget--link" :href="info.link">Liên hệ đội ngũ Stafflink </a>
      </div>
      <div class="widget--icon">
        <img class="h-32" :src="info.image" :alt="info.alt" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'HelpWidget',
  setup() {
    const helpWidgets = [
      {
        title: 'Hỗ trợ Khách hàng',
        link: '#',
        image: '/contacts/icon1.png',
        alt: 'Minh hoạ 1'
      },
      {
        title: 'Hỗ trợ Nhà tuyển dụng',
        link: '#',
        image: '/contacts/icon2.png',
        alt: 'Minh hoạ 2'
      },
      {
        title: 'Hỗ trợ Freelancer',
        link: '#',
        image: '/contacts/icon3.png',
        alt: 'Minh hoạ 3'
      },
      {
        title: 'Về chúng tôi Stafflink Team',
        link: '#',
        image: '/contacts/icon4.png',
        alt: 'Minh hoạ 4'
      }
    ]
    return {
      helpWidgets
    }
  }
}
</script>
<style scoped>
.widget--content {
  @apply bg-secondary flex justify-center flex-col sm:items-center sm:flex-row sm:justify-between rounded-lg px-3 py-4;
}
.widget--content .widget--title {
  @apply font-semibold text-xl mb-4 sm:mx-auto text-center sm:text-left text-tertiary-light;
}
.widget--content .widget--link {
  @apply text-primary text-lg block text-center md:text-left hover:underline hover:text-tertiary-light;
}
.widget--content .widget--icon {
  @apply flex justify-center md:justify-start;
}
</style>
