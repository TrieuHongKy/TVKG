<template>
  <div class="forgotpassowrd--container">
    <UForm :state="state" class="forgotpassowrd--form my-auto mx-auto" @submit="submit">
      <UFormGroup>
        <h2 class="text-xl md:text-2xl font-semibold text-center text-primary">ĐẶT LẠI MẬT KHẨU</h2>
        <div class="forgotpassowrd--illustration">
          <img src="/verify/forgotpassword.png" class="h-full w-full" alt="Xác minh Email" />
        </div>
      </UFormGroup>
      <UFormGroup>
        <div class="form--text w-full text-center">
          <p class="text-sm">Tạo lại mật khẩu cho tài khoản của bạn</p>
        </div>
        <div class="form--input md:w-[274px] my-4 mx-auto flex flex-col gap-4">
          <UFormGroup :error="passwordError">
            <UInput
              v-model="password"
              :ui="{
                placeholder: 'placeholder-gray-400 text-xs dark:placeholder-gray-100',
                rounded: 'rounded'
              }"
              type="password"
              size="xl"
              icon="i-heroicons-key"
              placeholder="Nhập mật khẩu mới"
              @change="passwordValidate"
            />
          </UFormGroup>
          <UFormGroup :error="confirmError">
            <UInput
              v-model="confirmPassword"
              :ui="{
                placeholder: 'placeholder-gray-400 text-xs dark:placeholder-gray-100',
                rounded: 'rounded'
              }"
              type="password"
              size="xl"
              icon="i-heroicons-clipboard-document-check"
              placeholder="Xác nhận mật khẩu"
              @change="confirmValidate"
            />
          </UFormGroup>
        </div>
      </UFormGroup>
      <UFormGroup>
        <div class="form--button w-full flex flex-col md:flex-row gap-4 justify-center">
          <div class="w-full md:w-1/12">
            <UButton type="submit" class="text-sm w-full rounded justify-center">Xác nhận </UButton>
          </div>
          <div class="w-full md:w-1/12">
            <UButton type="submit" color="primary" variant="outline" class="text-sm w-full rounded justify-center"
              >Huỷ bỏ</UButton
            >
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
    const state = ref({
      password: undefined,
      confirmPassword: undefined
    })
    function submit(event: FormSubmitEvent<any>) {
      // eslint-disable-next-line no-console
      console.log(event.data)
    }
    const password = ref('')
    const confirmPassword = ref('')
    const passwordError = ref('')
    const confirmError = ref('')

    const passwordValidate = () => {
      if (password.value && password.value.trim().length >= 8) {
        passwordError.value = ''
      } else {
        passwordError.value = 'Vui lòng nhập từ 8 kí tự trở lên'
      }
    }
    const confirmValidate = () => {
      // if (password.value && password.value.trim().length >= 6) {
      if (password.value === confirmPassword.value) {
        confirmError.value = ''
      } else {
        confirmError.value = 'Mật khẩu không khớp'
      }
      // } else {
      //   confirmError.value = 'Vui lòng nhập từ 6 kí tự trở lên'
      //   canProceed2.value = false
      // }
    }
    return {
      state,
      password,
      passwordError,
      passwordValidate,
      confirmPassword,
      confirmError,
      confirmValidate,
      submit
    }
  }
})
</script>
<style scoped>
.forgotpassowrd--container {
  @apply p-3 md:p-6 mb-4 md:mb-4 border border-primary rounded-lg;
}
.forgotpassowrd--illustration {
  @apply w-24 md:w-40 my-5 mx-auto;
}
</style>
