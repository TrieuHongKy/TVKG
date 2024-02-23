<script setup lang="ts">
import { ref } from 'vue'
import { string, object, email, minLength, Input } from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const schema = object({
  first_name: string('Vui lòng nhập họ'),
  last_name: string('Vui lòng nhập tên'),
  email: string('Vui lòng nhập email', [email('Vui lòng nhập đúng định dạng')]),
  password: string('Vui lòng nhập mật khẩu', [minLength(8, 'Vui lòng nhập ít nhất 8 kí tự')])
})

type Schema = Input<typeof schema>

const state = ref({
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  password: undefined
})

async function submit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}

const passwordFieldType = ref('password')

function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <color-mode></color-mode>
  <section class="sign-up h-screen flex justify-center items-center">
    <div
      class="container mx-auto sm:w-[90%] md:w-[600px] lg:w-[700px] xl:w-[800px] 2xl:w-[900px] border-2 border-gray px-5 md:px-0 rounded-lg py-10"
    >
      <p class="text-3xl flex justify-center mt-5">Đăng Ký</p>
      <div class="flex justify-center items-center">
        <UButton
          color="blue"
          :ui="{ rounded: 'rounded-full' }"
          class="w-full lg:w-[600px] h-[45px] flex justify-center items-center mt-7 text-xl"
          ><svg
            id="google"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="40"
            height="40"
            viewBox="-380.2 274.7 65.7 65.8"
          >
            <circle cx="-347.3" cy="307.6" r="32.9" fill="#e0e0e0"></circle>
            <circle cx="-347.3" cy="307.1" r="32.4" fill="#fff"></circle>
            <g>
              <defs>
                <path
                  id="a"
                  d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                ></path>
              </defs>
              <clipPath id="b"><use overflow="visible" xlink:href="#a"></use></clipPath>
              <path fill="#fbbc05" d="M-370.8 320.3v-26l17 13z" clip-path="url(#b)"></path>
              <defs>
                <path
                  id="c"
                  d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                ></path>
              </defs>
              <clipPath id="d"><use overflow="visible" xlink:href="#c"></use></clipPath>
              <path fill="#ea4335" d="M-370.8 294.3l17 13 7-6.1 24-3.9v-14h-48z" clip-path="url(#d)"></path>
              <g>
                <defs>
                  <path
                    id="e"
                    d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  ></path>
                </defs>
                <clipPath id="f"><use overflow="visible" xlink:href="#e"></use></clipPath>
                <path fill="#34a853" d="M-370.8 320.3l30-23 7.9 1 10.1-15v48h-48z" clip-path="url(#f)"></path>
              </g>
              <g>
                <defs>
                  <path
                    id="g"
                    d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  ></path>
                </defs>
                <clipPath id="h"><use overflow="visible" xlink:href="#g"></use></clipPath>
                <path fill="#4285f4" d="M-322.8 331.3l-31-24-4-3 35-10z" clip-path="url(#h)"></path>
              </g>
            </g>
          </svg>
          Đăng nhập với Google
        </UButton>
      </div>
      <div class="flex justify-center items-center mt-5">
        <div class="w-60 h-0.5 bg-[#cccccc]"></div>
        <p class="px-5 text-[#cccccc]">Hoặc</p>
        <div class="w-60 h-0.5 bg-[#cccccc]"></div>
      </div>
      <div class="flex justify-center items-center">
        <UForm :schema="schema" :state="state" @submit="submit">
          <div class="flex space-x-8 pt-5">
            <UFormGroup label="" name="first_name" class="w-full md:w-[290px]" required>
              <UInput v-model="state.first_name" placeholder="Họ" size="xl" />
            </UFormGroup>
            <UFormGroup label="" name="last_name" class="w-full md:w-[290px]" required>
              <UInput v-model="state.last_name" placeholder="Tên" size="xl" />
            </UFormGroup>
          </div>

          <UFormGroup label="" name="email" class="py-5" required>
            <UInput v-model="state.email" placeholder="Email" size="xl" />
          </UFormGroup>

          <UFormGroup label=" " name="password">
            <UInput
              v-model="state.password"
              :type="passwordFieldType"
              placeholder="Mật khẩu(Tối thiểu 8 kí tự)"
              size="xl"
            />
            <span
              class="absolute top-6 transform -translate-y-1/2 right-2 cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <i
                :class="passwordFieldType === 'password' ? 'i-heroicons-eye-slash-solid' : 'i-heroicons-eye-solid'"
              ></i>
            </span>
          </UFormGroup>
          <UCheckbox name="checkbox5" class="flex justify-center items-center py-5">
            <template #label>
              <span class=""
                >Có, tôi hiểu và đồng ý với
                <span class="text-primary">Điều khoản dịch vụ của Tìm Việc Kiên Giang</span>,
                <span>
                  bao gồm <span class="text-primary">Thỏa <br />thuận người dùng</span> và
                  <span class="text-primary">Chính sách quyền riêng tư</span> .</span
                >
              </span>
            </template>
          </UCheckbox>
          <div class="flex flex-col justify-center items-center">
            <UButton
              type="submit"
              variant="solid"
              :ui="{ rounded: 'rounded-full' }"
              class="w-full lg:w-[600px] h-[45px] flex justify-center items-center mb-7 text-xl"
            >
              Đăng ký
            </UButton>
            <p class="py-5">Bạn đã có tài khoản ? <a href="" class="text-primary">Đăng nhập</a></p>
            <p class="">Bạn muốn tuyển dụng ? <a href="" class="text-primary">Đăng ký doanh nghiệp</a></p>
          </div>
        </UForm>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
