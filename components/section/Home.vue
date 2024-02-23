<template>
  <div class="home__section">
    <div class="home__section--content">
      <div class="md:w-1/2 flex flex-col justify-center gap-10">
        <p class="home__section--title">Công việc nên hoạt động như thế nào</p>
        <p class="home__section--description">
          Quên những quy tắc cũ. Bạn có thể có những người tốt nhất. Ngay lúc này. Ngay tại đây.
        </p>
        <div class="flex items-center">
          <UButton
            color="primary"
            class="px-6"
            size="lg"
            variant="solid"
            :ui="{ rounded: 'rounded-full' }"
            aria-label="Start"
            >Bắt đầu</UButton
          >
        </div>
      </div>
      <div class="w-5/12 hidden md:flex justify-center aspect-square">
        <img class="w-full h-full object-cover" :src="'/home/' + MainImage.image" :alt="MainImage.alt" />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-gray-500 font-medium dark:text-tertiary-light">Tin cậy bởi</span>
      <div class="home__section--company">
        <span v-for="company in CompanyLogo" :key="company.id"
          ><img class="h-[40px]" :src="company.image" :alt="company.alt"
        /></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionHome',
  setup() {
    const MainImage = {
      image: 'main-image.png',
      alt: 'Ảnh Chính'
    }
    const CompanyLogo = [
      {
        id: 1,
        image: '/home/microsoft.svg',
        alt: 'Microsoft'
      },
      {
        id: 2,
        image: '/home/airbnb.svg',
        alt: 'Airbnb'
      },
      {
        id: 3,
        image: '/home/bissell.svg',
        alt: 'Bissell'
      }
    ]

    return {
      MainImage,
      CompanyLogo
    }
  }
})
</script>
<style scoped>
.home__section {
  @apply flex flex-col w-full md:p-4 gap-6 justify-center;
}
.home__section--content {
  @apply w-full flex flex-row justify-between;
}
.home__section--title {
  @apply text-4xl md:text-6xl md:leading-tight tracking-tight font-semibold flex flex-col text-primary;
}
.home__section--description {
  @apply text-base md:text-xl md:leading-relaxed;
}
.home__section--company {
  @apply flex flex-row gap-6;
}
</style>
