<template>
  <div class="big-content rounded-xl">
    <div class="big-content-cate">
      <p class="font-medium text-xl md:text-3xl leading-tight">Duyệt ứng viên theo danh mục</p>
      <span
        >Bạn đang tìm việc?<a href="#" class="hover:text-secondary text-primary pl-2"><u>Duyệt công việc</u></a></span
      >
    </div>
    <div class="grid grid-cols-4 gap-8">
      <div v-for="cate in CandidatesByCategory" :key="cate.id" class="box-category">
        <a :href="cate.href">
          <div class="flex flex-col justify-between pb-2 md:pb-10 gap-4">
            <span class="title-box-category">{{ cate.name }}</span>

            <span class="content-box-category">
              <!-- <el-icon class="icon-box-category"><StarFilled /></el-icon>{{ cate.star }}/5 -->
              <span class="pl-6">{{ cate.skillQuantity }} kỹ năng</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CandidatesByCategory',
  setup() {
    const CandidatesByCategory = [
      {
        id: 1,
        name: 'Phát triển & CNTT',
        star: 4.85,
        skillQuantity: 1853,
        href: '#'
      },
      {
        id: 2,
        name: 'Trí tuệ nhân tạo',
        star: 4.8,
        skillQuantity: 944,
        href: '#'
      },
      {
        id: 3,
        name: 'Thiết kế & sáng tạo',
        star: 4.91,
        skillQuantity: 912,
        href: '#'
      },
      {
        id: 4,
        name: 'Bán hàng & tiếp thị',
        star: 4.77,
        skillQuantity: 771,
        href: '#'
      },
      {
        id: 5,
        name: 'Viết & dịch thuật',
        star: 4.92,
        skillQuantity: 537,
        href: '#'
      },
      {
        id: 6,
        name: 'Quản trị & Hỗ trợ',
        star: 4.77,
        skillQuantity: 613,
        href: '#'
      },
      {
        id: 7,
        name: 'Tài chỉnh & Kế toán',
        star: 4.79,
        skillQuantity: 814,
        href: '#'
      },
      {
        id: 8,
        name: 'Kỹ thuật & Kiến trúc',
        star: 4.91,
        skillQuantity: 753,
        href: '#'
      }
    ]
    return {
      CandidatesByCategory
    }
  }
})
</script>
<style scoped>
.big-content-cate {
  @apply flex flex-col gap-4;
}
.box-category {
  @apply w-full col-span-1 h-full bg-green-50 p-4 hover:bg-green-100 rounded-xl dark:bg-gray-600 dark:hover:bg-gray-500;
}
.title-box-category {
  @apply font-medium text-xl dark:text-tertiary-light text-inherit;
}
.content-box-category {
  @apply flex flex-row items-center text-inherit;
}
</style>
