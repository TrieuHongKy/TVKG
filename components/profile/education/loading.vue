<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div class="profile__section">
      <div class="profile__education--header">
        <div class="profile__education--heading">
          <USkeleton class="h-4 w-[250px]" />
        </div>
        <div class="profile__education--add">
          <!-- <UIcon
                v-if="!public"
                name="i-heroicons-plus-circle"
                class="profile__education--icon"
                @click="openTemplate('addEducation')"
              ></UIcon> -->
        </div>
      </div>
      <div class="mt-4">
        <div class="profile__education--content">
          <div class="flex items-center justify-between pb-1">
            <span class="profile__education--title">
              <!-- {{ edu.name }} -->
              <USkeleton class="h-4 w-[250px]" />
            </span>
            <div class="profile__education--action">
              <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
              <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
            </div>
          </div>
          <div class="space-y-2">
            <USkeleton class="h-4 w-[200px]" />
            <USkeleton class="h-4 w-[150px]" />
            <USkeleton class="h-4 w-[150px]" />
          </div>
        </div>
      </div>
      <!-- <div v-if="!public && education.education.length == 0" class="mt-4">
            <p class="text-gray-500">Bạn chưa xác thực chương trình giáo dục nào</p>
            <u class="profile__education--default" @click="openTemplate('addEducation')">Thêm chương trình giáo dục</u>
          </div>
          <div v-if="public && education.education.length == 0" class="mt-4 text-gray-500">
            <p>Tài khoản này chưa cập nhật bất kỳ chương trình giáo dục nào</p>
          </div> -->
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.profile__education-add {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__education--header {
  @apply flex justify-between;
}
.profile__education--heading {
  @apply font-semibold text-lg;
}
.profile__education--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__education--content {
  @apply mt-4 flex flex-col gap-1;
}
.profile__education--title {
  @apply font-semibold text-base md:basis-4/5;
}
.profile__education--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__education--date {
  @apply text-xs text-gray-500;
}
.profile__education--default {
  @apply text-sm text-green-600 font-medium hover:text-primary cursor-pointer;
}
</style>
