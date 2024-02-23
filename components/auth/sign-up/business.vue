<!-- eslint-disable vue/no-unused-vars -->
<script lang="ts">
export default defineComponent({
  setup(props) {
    const { signIn } = useAuth()
    const { login, signUp, signInWithGoogle } = useAuthStore()

    const { user_type } = storeToRefs(useAuthStore())

    const name = ref('')
    const email = ref('')
    const company_name = ref('')
    const company_logo = ref(null)
    const company_address = ref('')
    const tax_code = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    const showPassword = ref<Boolean>(false)
    const uploadImage = ref(false)
    const selectedFile = ref(null)

    const handleSignUp = async () => {
      const data = {
        name: name.value,
        email: email.value,
        company_name: company_name.value,
        company_logo: company_logo.value,
        company_address: company_address.value,
        tax_code: tax_code.value,
        user_type: user_type.value || null,
        selectedFile: selectedFile.value,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
      await signUp(data)
    }

    const err = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })

    const handleSignIn = async () => {
      const data = {
        email: email.value,
        password: password.value
      }

      if (email.value !== '') {
        try {
          await login(data)
        } catch (error) {
          err.value.email = 'Sai email hoặc mật khẩu'
        }
      } else {
        err.value.email = 'Vui lòng nhập email'
      }

      if (password.value !== '') {
        try {
          await login(data)
        } catch (error) {
          err.value.password = 'Sai email hoặc mật khẩu'
        }
      } else {
        err.value.password = 'Vui lòng nhập mật khẩu'
      }

      // if (email.value !== '' && password.value !== '') {
      //   try {
      //     await login(data)
      //   } catch (error) {
      //     err.value.email = 'Sai email hoặc mật khẩu'
      //   }
      // } else {
      //   err.value.email = 'Vui lòng nhập đầy đủ thông tin'
      // }
    }

    const file = computed(() => {
      if (selectedFile.value) {
        return URL.createObjectURL(selectedFile.value)
      }
    })

    const changeFile = () => {
      selectedFile.value = null
    }

    const handleUpload = () => {
      if (selectedFile.value) {
        selectedFile.value = null
      }

      uploadImage.value = true
    }

    defineShortcuts({
      escape: {
        usingInput: true,
        whenever: [uploadImage],
        handler: () => {
          uploadImage.value = false
        }
      }
    })

    function togglePasswordVisibility() {
      showPassword.value = !showPassword.value
      setTimeout(() => {
        showPassword.value = !showPassword.value
      }, 1000)
    }

    async function signInWithFacebook() {
      await signIn('facebook', { redirect: false, callbackUrl: '/' })
    }
    return {
      name,
      email,
      password,
      password_confirmation,
      company_name,
      company_logo,
      company_address,
      tax_code,
      uploadImage,
      err,
      showPassword,
      selectedFile,
      handleUpload,
      file,
      changeFile,
      signIn,
      togglePasswordVisibility,
      signInWithGoogle,
      signInWithFacebook,
      handleSignIn,
      handleSignUp
    }
  }
})
</script>

<template>
  <h3 class="text-2xl font-bold text-center mb-4">Đăng ký tài khoản doanh nghiệp</h3>
  <form class="flex w-3/5 flex-col md:flex-row flex-wrap gap-2 mx-auto" @submit.prevent="handleSignUp">
    <!-- Name input -->
    <div class="flex gap-4 w-full">
      <UFormGroup class="w-1/2">
        <div class="mb-4">
          <UInput v-model="name" type="text" size="xl" placeholder="Tên đại diện" />
        </div>
      </UFormGroup>

      <UFormGroup class="w-1/2">
        <div class="mb-4">
          <UInput v-model="company_name" type="text" size="xl" placeholder="Tên doanh nghiệp" />
        </div>
      </UFormGroup>
    </div>
    <!-- Email input -->
    <!-- <div class="mb-4">
      <UInput v-model="email" type="text" size="xl" placeholder="Email" />
    </div> -->

    <div class="flex w-full gap-4">
      <UFormGroup v-slot="{ error }" class="mb-4 w-2/3" label="" :error="err.email">
        <UInput
          v-model="email"
          type="email"
          placeholder="Email"
          :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
          size="xl"
          help=""
        />
      </UFormGroup>
      <UFormGroup v-slot="{ error }" class="mb-4 w-1/3" label="" :error="err.email">
        <UInput
          v-model="tax_code"
          type="text"
          placeholder="Tax code"
          :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
          size="xl"
          help=""
        />
      </UFormGroup>
    </div>

    <!-- Password input -->
    <UFormGroup v-slot="{ err }" class="mb-4 w-full" label="" :error="err.password">
      <UInput v-model="company_address" type="text" placeholder="Địa chỉ" size="xl"> </UInput>
    </UFormGroup>
    <UFormGroup v-slot="{ err }" class="mb-4 w-full" label="" :error="err.password">
      <UInput v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Mật khẩu" size="xl"
        ><template #trailing>
          <UButton
            color="gray"
            variant="link"
            :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            :padded="false"
            @click="togglePasswordVisibility"
          />
        </template>
      </UInput>
    </UFormGroup>
    <UFormGroup class="mb-4 w-full">
      <UInput
        v-model="password_confirmation"
        size="xl"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Xác nhận mật khẩu"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            color="gray"
            variant="link"
            :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            :padded="false"
            @click="togglePasswordVisibility"
          />
        </template>
      </UInput>
    </UFormGroup>

    <div class="flex flex-col gap-2">
      <UAvatar class="border" size="3xl" :src="file" :alt="company_name"></UAvatar>
      <UButton @click="handleUpload">
        <div class="flex items-center gap-2">
          <i class="i-heroicons-camera-20-solid"></i>
          <span>
            {{ selectedFile ? 'Thay đổi ảnh logo' : 'Thêm ảnh logo' }}
          </span>
        </div>
      </UButton>

      <UModal v-model="uploadImage" :overlay="true">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center text-lg">
              <p>Cập nhật ảnh logo công ty</p>
            </div>
          </template>
          <UploadImage v-model="selectedFile" :file="file as any" />
          <template #footer>
            <div class="flex gap-4 justify-end">
              <div class="CancelButton">
                <UButton
                  :ui="{ rounded: 'rounded-full' }"
                  size="lg"
                  color="primary"
                  variant="outline"
                  class="px-6"
                  @click="changeFile"
                  >Thay đổi hình ảnh</UButton
                >
              </div>
              <div class="DeletaButton">
                <UButton
                  type="submit"
                  :ui="{ rounded: 'rounded-full' }"
                  size="lg"
                  color="primary"
                  variant="solid"
                  class="px-6"
                  @click="uploadImage = false"
                >
                  Lưu
                </UButton>
              </div>
            </div>
          </template>
        </UCard>
      </UModal>
    </div>

    <!-- Submit button -->
    <UButton type="submit" class="w-full flex justify-center"> Đăng ký </UButton>

    <div class="mb-4">
      <p class="text-center w-full mt-4 mb-0 text-sm text-neutral-600 dark:text-neutral-400">
        Bạn đã có tài khoản?
        <nuxt-link
          :to="'/auth/signin'"
          class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
          >Đăng nhập</nuxt-link
        >
      </p>
    </div>

    <!-- Divider -->
    <!-- <UDivider class="my-4" label="Hoặc" color="gray" /> -->
    <!-- Social login buttons -->
    <!-- <div class="w-full">
      <auth-sign-in-with-google @click.prevent="signInWithGoogle" />
    </div> -->
  </form>
</template>

<style>
.social-media-button {
  @apply w-full md:w-1/2 flex gap-2 justify-center items-center bg-transparent dark:bg-transparent border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-tertiary dark:text-tertiary-light focus:outline-none focus:ring-2 ring-primary hover:border-primary dark:hover:border-primary;
}
</style>
