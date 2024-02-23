<template>
  <div class="mailverify--container">
    <UForm :state="state" class="mailverify--form my-auto mx-auto" @submit="submit">
      <UFormGroup>
        <h2 class="mailverify-heading text-xl md:text-2xl font-semibold text-center text-primary">
          XÁC MINH EMAIL CỦA BẠN
        </h2>
        <div class="mailverify--illustration">
          <img src="/verify/authmail.png" class="h-full w-full" alt="Xác minh Email" />
        </div>
      </UFormGroup>
      <div class="mailverify--form--text w-full text-center">
        <p class="text-sm">Hệ thống sẽ gửi mã xác nhận cho email bạn nhập bên dưới !</p>
        <p class="text-sm">Hãy kiểm tra email để tiếp tục các bước.</p>
      </div>
      <UFormGroup :error="emailError" class="text-center my-4">
        <div class="mailverify--form--input md:w-[274px] mx-auto">
          <UInput
            v-model="email"
            :ui="{
              placeholder: 'placeholder-gray-400 text-xs dark:placeholder-gray-100',
              rounded: 'rounded'
            }"
            type="email"
            size="xl"
            icon="i-heroicons-envelope-open"
            placeholder="Nhập email xác nhận"
            @change="mailValidate"
          />
        </div>
      </UFormGroup>
      <UFormGroup>
        <div class="mailverify--form--button w-full flex flex-col md:flex-row gap-4 justify-center">
          <div class="w-full md:w-1/12">
            <UButton type="submit" class="mailverify--button">Xác nhận </UButton>
          </div>
          <div class="w-full md:w-1/12">
            <UButton type="submit" color="primary" variant="outline" class="mailverify--button">Huỷ bỏ </UButton>
          </div>
        </div>
      </UFormGroup>
    </UForm>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

export default defineComponent({
  name: 'VerifyMail',
  setup() {
    const userEmail = 'thinhtlppc04491@fpt.edu.vn'
    const state = ref({
      email: undefined
    })
    const email = ref('')
    const emailError = ref('')
    const mailValidate = () => {
      if (validateEmail(email.value)) {
        emailError.value = ''
      } else {
        emailError.value = 'Vui lòng nhập đúng định dạng email'
      }
    }

    function submit(event: FormSubmitEvent<any>) {
      // eslint-disable-next-line no-console
      console.log(event.data)
    }
    return {
      state,
      userEmail,
      email,
      emailError,
      submit,
      mailValidate
    }
  }
})
</script>
<style scoped>
.mailverify--container {
  @apply p-3 md:p-6 mb-4 md:mb-4  border border-primary rounded-lg;
}
.mailverify--illustration {
  @apply w-24 md:w-52 my-5 mx-auto;
}
.mailverify--button {
  @apply text-sm w-full rounded justify-center;
}
</style>
