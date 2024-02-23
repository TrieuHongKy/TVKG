<script setup lang="ts">
import { ref } from 'vue'
import { type Input, maxLength, object, string } from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

const title = ref('Hãy hiển thị cho khách hàng phiên bản tốt nhất của bạn!')
const text = ref(
  'Một bức ảnh chuyên nghiệp giúp bạn xây dựng sự tin tưởng với khách hàng. Để đảm bảo an toàn và đơn giản, họ sẽ thanh toán cho bạn thông qua chúng tôi - đây là lý do tại sao chúng tôi cần thông tin cá nhân của bạn.'
)

// Tỉnh / Thành phố
const countries = ['Kiên giang', 'An giang', 'Long an', 'Cần thơ']
const country = ref(countries[0])

// Quận / Huyện
const districts = ['Kiên giang', 'An giang', 'Long an', 'Cần thơ']
const district = ref(districts[0])

// Xã / Thị Xã
const towns = ['Kiên giang', 'An giang', 'Long an', 'Cần thơ']
const town = ref(towns[0])

const selectedImage = ref<string | undefined>(undefined)
const isFormValid = ref(true)

const schema = object({
  address: string('Địa chỉ không được bỏ trống'),
  phone: string('Số điện thoại không được bỏ trống', [maxLength(10, 'Số điện thoại không hợp lệ')])
})

type Schema = Input<typeof schema>

const state = ref({
  address: undefined,
  phone: undefined,
  errors: {
    address: '',
    phone: ''
  }
})

function validateForm() {
  const errors = {
    address: '',
    phone: ''
  }

  if (!state.value.address) {
    errors.address = 'Địa chỉ không được bỏ trống'
  }

  state.value.errors = errors
  isFormValid.value = !Object.values(errors).some((error) => error !== '')
}

function submit(event: FormSubmitEvent<Schema>) {
  validateForm()

  if (isFormValid.value) {
    // Form is valid, you can proceed with your logic here
    console.log(state.value.address, state.value.phone)
  }
}

const handleFileUpload = (event: Event) => {
  const selectedFile = (event.target as HTMLInputElement).files?.[0]
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile)
    selectedImage.value = imageUrl
  }
}
</script>

<template>
  <section class="location flex items-center justify-center max-h-300 overflow-y-auto">
    <div class="container mx-auto">
      <div class="mx-5 space-y-5">
        <span>10/10</span>
        <div class="space-y-5">
          <p class="font-medium lg:text-[36px]">{{ title }}</p>
          <p class="lg:text-[16px]">{{ text }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 flex-wrap mt-10">
        <div class="mx-20">
          <div class="flex justify-center items-center mx-14">
            <UAvatar
              :src="selectedImage"
              alt="Benjamin Canac"
              icon="i-heroicons-photo"
              size="3xl"
              chip-color="primary"
              chip-position="top-right"
            />
          </div>

          <div class="flex justify-center items-center mt-5 mx-5">
            <UButton
              :ui="{ rounded: 'rounded-full' }"
              variant="solid"
              color="primary"
              size="lg"
              class="px-6"
              icon="i-heroicons-plus"
            >
              <UFormGroup for="upload" class="relative text-center flex items-center justify-center space-x-2">
                <UInput
                  id="upload"
                  type="file"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  @change="handleFileUpload"
                />
                <span> Tải ảnh lên</span>
              </UFormGroup>
            </UButton>
          </div>
        </div>
        <div class="space-y-5 flex-wrap mx-5 mb-10">
          <UForm :schema="schema" :state="state" name="myForm" @submit="submit">
            <UFormGroup label="Địa chỉ" name="address" required class="">
              <div class="flex-col space-y-5">
                <UInput v-model="state.address" class="md:w-[350px]" />
                <span class="text-red-500">{{ state.errors && state.errors.address }}</span>
              </div>
            </UFormGroup>
            <div class="flex-col space-y-5">
              <div class="mt-5">
                <UFormGroup label="Thành phố" class="md:w-[350px]" name="city" required>
                  <USelect v-model="country" :options="countries" />
                </UFormGroup>
              </div>
              <div class="">
                <UFormGroup label="Quận/ Huyện" name="district" class="md:w-[350px]">
                  <USelect v-model="district" :options="districts" class="" />
                </UFormGroup>
              </div>
              <div>
                <UFormGroup label="Xã/Thị Xã" name="town" class="md:w-[350px]">
                  <USelect v-model="town" :options="towns" class="" />
                </UFormGroup>
              </div>
            </div>

            <UFormGroup label="Số điện thoại" name="phone" class="md:w-40 py-5">
              <UInput v-model="state.phone" placeholder="+84" class="md:w-[350px]" />
              <span class="text-red-500">{{ state.errors && state.errors.phone }}</span>
            </UFormGroup>
          </UForm>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
