<template>
  <div class="mailverify--container">
    <UForm :state="state" class="mailverify--form my-auto mx-auto" @submit="submit">
      <UFormGroup>
        <h2 class="mailverify-heading text-xl md:text-2xl font-semibold text-center text-primary">NHẬP MÃ XÁC NHẬN</h2>
        <div class="mailverify--illustration">
          <img src="/verify/mailverify.png" class="h-full w-full" alt="Xác minh Email" />
        </div>
      </UFormGroup>
      <div class="mailverify--form--text w-full text-center">
        <p class="text-sm">
          Hệ thống đã gửi mã xác minh cho email:
          <span class="mailverify--usermail text-primary font-semibold"> {{ userEmail }}</span>
        </p>
        <p class="text-sm">Vui lòng nhập mã để tiếp tục !</p>
      </div>
      <UFormGroup :error="emailError" class="text-center my-4">
        <div class="mailverify--form--input md:w-[274px] mx-auto">
          <UInput
            v-model="email"
            :ui="{
              placeholder: 'placeholder-gray-400 text-xs dark:placeholder-gray-100',
              rounded: 'rounded'
            }"
            size="xl"
            icon="i-heroicons-envelope-open"
            placeholder="Nhập mã xác nhận"
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
            <UButton
              type="submit"
              class="mailverify--button"
              variant="outline"
              color="primary"
              :disabled="disabled"
              @click="setActiveButton"
              ><UIcon name="i-heroicons-arrow-path-solid" />Gửi lại
            </UButton>
          </div>
        </div>
      </UFormGroup>
    </UForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
      if (email.value) {
        if (email.value && email.value.trim().length == 4) {
          emailError.value = ''
        } else {
          emailError.value = 'Vui lòng nhập đúng mã đã được gửi !'
        }
      }
    }
    function submit(event: FormSubmitEvent<any>) {
      // eslint-disable-next-line no-console
      console.log(event.data)
    }

    const disabled = ref(false)
    const setActiveButton = () => {
      disabled.value = true
      setTimeout(() => {
        disabled.value = false
      }, 10000)
    }
    return {
      state,
      userEmail,
      email,
      emailError,
      submit,
      mailValidate,
      disabled,
      setActiveButton
    }
  }
})
</script>
<style scoped>
.mailverify--container {
  @apply p-3 md:p-6 mb-4 md:mb-4  border border-primary rounded-lg;
}
.mailverify--illustration {
  @apply w-24 md:w-32 my-5 mx-auto;
}
.mailverify--button {
  @apply text-sm w-full rounded justify-center;
}
</style>
