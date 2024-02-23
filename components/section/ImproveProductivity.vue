<template>
  <div class="section__productivity">
    <div class="w-full md:w-5/12 rounded-xl bg-green-50">
      <img
        class="section__productivity--image"
        src="https://images.unsplash.com/photo-1487073240288-854ac7f1bb3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJlZWxhbmNlcnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
        alt="Ảnh minh họa"
      />
    </div>
    <div class="section__productivity--content">
      <div class="section__productivity--heading">
        <span>Nâng cao năng suất công việc của bạn mà không tốn phí</span>
      </div>
      <div class="flex flex-col gap-8">
        <div v-for="ct in ContentProductivity" :key="ct.id" class="section__productivity--details">
          <div class="section__productivity--icon">
            <UIcon :name="ct.icon" />
          </div>
          <div class="section__productivity--box">
            <span class="section__productivity--title">{{ ct.title }}</span>
            <p class="section__productivity--description">
              {{ ct.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="button-bottom">
        <UButton to="#" color="primary" target="blank" variant="outline" :ui="{ rounded: 'rounded-full' }" size="lg"
          >Đăng ký miễn phí
        </UButton>
        <UButton to="#" target="blank" :ui="{ rounded: 'rounded-full' }" size="lg">Học cách tuyển dụng </UButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionImproveProductivity',
  setup() {
    const ContentProductivity = [
      {
        id: 1,
        icon: 'i-heroicons-pencil-square',
        title: 'Không tốn chi phí tham gia',
        description: 'Đăng ký và tìm kiếm các chuyên gia, khám phá các dự án hoặc thậm chí đặt lịch hẹn tư vấn.'
      },
      {
        id: 2,
        icon: 'i-heroicons-arrow-top-right-on-square',
        title: 'Đăng bài tuyển dụng và thuê những tài năng hàng đầu',
        description:
          'Tìm kiếm tài năng không còn là việc mất thời gian. Đăng bài tuyển dụng hoặc chúng tôi có thể tìm kiếm giúp bạn!'
      },
      {
        id: 3,
        icon: 'i-heroicons-academic-cap',
        title: 'Làm việc với những người xuất sắc mà không phải bỏ quá nhiều chi phí',
        description: 'TVKG giúp nâng cao năng suất công việc của bạn và tận dụng mức phí giao dịch thấp.'
      }
    ]
    return {
      ContentProductivity
    }
  }
})
</script>
<style scoped>
.section__productivity {
  @apply flex flex-col w-full md:p-4 gap-6 md:flex-row;
}
.section__productivity--content {
  @apply w-full md:w-7/12 flex flex-col gap-6 md:py-4;
}
.section__productivity--heading {
  @apply text-2xl md:text-3xl md:w-11/12 font-medium md:leading-[3rem];
}
.section__productivity--image {
  @apply h-full w-full rounded-xl object-cover;
}
.section__productivity--details {
  @apply flex flex-row gap-3;
}
.section__productivity--icon {
  @apply text-3xl;
}
.section__productivity--box {
  @apply flex flex-col gap-3;
}
.section__productivity--title {
  @apply font-medium text-xl;
}
.section__productivity--description {
  @apply text-sm font-light;
}
.button-bottom {
  @apply flex flex-row items-center font-medium gap-4;
}
</style>
