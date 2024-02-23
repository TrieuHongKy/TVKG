<template>
  <div>
    <div class="profile__workHistory">
      <div class="profile__workHistory--heading">Lịch sử công việc</div>

      <div v-if="workHistory.length > 0">
        <div v-for="work in workHistory" :key="work.id" class="profile__workHistory--content">
          <p class="profile__workHistory--title" href="#">
            {{ work.name }}
          </p>
          <div class="mt-1">
            <small class="text-gray-400">
              <span>
                {{ work.timeStart }}
                -
                {{ work.timeEnd }}
              </span>
            </small>
          </div>
          <div class="mt-2">
            <div v-if="work.feedback === ''">
              <p class="light">Không có phản hồi nào được đưa ra</p>
            </div>
            <div v-else>
              <i>"{{ work.feedback }}"</i>
            </div>
          </div>
          <div class="grid grid-cols-3 mt-2">
            <div class="">
              <span>
                {{ work.total }}
                <span class="profile__workHistory--value">đ</span>
              </span>
            </div>
            <div class="">
              <span>
                {{ work.salary }}đ
                <span class="profile__workHistory--value"><i>/giờ</i></span>
              </span>
            </div>
            <div class="">
              {{ work.time }}
              <span class="profile__workHistory--value"><i>giờ</i></span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!public && workHistory.length == 0" class="m-4">
        <p class="mb-4">
          Chúng tôi chưa tìm thấy lịch sử công việc nào của bạn Các công việc đã hoàn thành của bạn sẽ hiển thị ở đây.
          Bắt đầu tìm kiếm công việc
        </p>
        <nuxt-link to="#" class="profile__workHistory--default"> Bắt đầu tìm kiếm công việc </nuxt-link>
      </div>
      <div v-if="public && workHistory.length == 0" class="m-4 text-gray-500">
        <p>Tài khoản người dùng này chưa có bất kỳ lịch sử công việc nào</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    public: {
      type: Boolean,
      default: false
    },
    workHistory: {
      type: Object,
      default: null
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.profile__workHistory {
  @apply p-4 border-b border-primary;
}
.profile__workHistory--heading {
  @apply font-semibold text-lg;
}
.profile__workHistory--content {
  @apply p-2 [&:not(:last-child)]:border-b border-primary;
}
.profile__workHistory--title {
  @apply text-primary font-medium;
}
.profile__workHistory--value {
  @apply text-slate-500 dark:text-slate-400;
}
.profile__workHistory--default {
  @apply text-green-600 font-medium hover:text-primary dark:hover:text-primary cursor-pointer;
}
</style>
