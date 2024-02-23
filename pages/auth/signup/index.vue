<template>
  <div class="w-screen h-screen flex flex-col items-center gap-8">
    <h2 class="w-full text-3xl text-center">Bạn muốn tham gia với vai trò là</h2>
    <div class="container w-4/5 md:w-3/5 mx-auto flex flex-col md:flex-row items-center gap-8 h-fit">
      <UCard
        shadow="never"
        :class="{ 'border-primary': user_type === 'candidate', 'border-transparent': user_type !== 'candidate' }"
        class="candidate account__section w-full md:w-1/2 h-full cursor-pointer border-2"
        @click="handleCardClick('candidate')"
      >
        <div class="relative">
          <div
            :class="{ 'bg-primary': user_type === 'candidate' }"
            class="w-6 h-6 border-2 dark:border-2 rounded-full flex items-center justify-center absolute top-0 right-0"
          >
            <div class="w-4 h-4 border-2 dark:border-2 rounded-full flex items-center justify-center"></div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center mt-2">
          <img class="mx-auto" :src="'/images/create-profile/medal-icon.png'" alt="" />
          <h3 class="text-2xl mt-10">Tôi là ứng viên đến để tìm công việc</h3>
        </div>
      </UCard>
      <UCard
        shadow="never"
        :class="{ 'border-primary': user_type === 'company', 'border-transparent': user_type !== 'company' }"
        class="company account__section w-full md:w-1/2 h-full border-2 cursor-pointer"
        @click="handleCardClick('company')"
      >
        <div class="relative">
          <div
            :class="{ 'bg-primary': user_type === 'company' }"
            class="w-6 h-6 border-2 dark:border-2 rounded-full flex items-center justify-center absolute top-0 right-0"
          >
            <!-- Hình tròn bên trong -->
            <div class="w-4 h-4 border-2 dark:border-2 rounded-full flex items-center justify-center">
              <!-- Nội dung bên trong hình tròn -->
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center mt-2">
          <img class="mx-auto" :src="'/images/create-profile/phone-icon.png'" alt="" />
          <h3 class="text-2xl mt-10">Tôi là doanh nghiệp đến để tuyển dụng nhân sự</h3>
        </div>
      </UCard>
    </div>
    <div class="w-1/3">
      <UButton
        color="primary"
        :disabled="user_type ? false : true"
        class="md:w-full text-center py-2 flex justify-center font-medium text-lg"
        size="xl"
        @click="redirectToSignUp"
        >{{
          user_type
            ? 'Tham gia với tư cách ' + (user_type === 'company' ? 'nhà tuyển dụng' : 'ứng viên')
            : ' Tạo tài khoản'
        }}</UButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth'
})
const { user_type } = storeToRefs(useAuthStore())
const handleCardClick = (type: string) => {
  user_type.value = type
}

const redirectToSignUp = () => {
  if (user_type.value === 'company') {
    navigateTo('/auth/signup/business')
  } else {
    navigateTo('/auth/signup/candidate')
  }
}
</script>

<style></style>
