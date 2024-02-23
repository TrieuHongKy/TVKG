<!-- eslint-disable vue/no-unused-vars -->
<script lang="ts">
export default defineComponent({
  props: {
    formVariant: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { signIn } = useAuth()
    const { login, signUp, signInWithGoogle } = useAuthStore()

    const { user_type } = storeToRefs(useAuthStore())

    const name = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')
    type VARIANT = 'REGISTER' | 'LOGIN'
    const variant = ref<VARIANT>(props.formVariant as VARIANT)
    const showPassword = ref<Boolean>(false)

    const handleSignUp = async () => {
      const data = {
        name: name.value,
        email: email.value,
        user_type: user_type.value || null,
        password: password.value,
        password_confirmation: password_confirmation.value
      }
      err.value.name = name.value === '' ? 'Vui lòng nhập tên người dùng!' : ''
      err.value.email = email.value === '' ? 'Vui lòng nhập email!' : ''
      err.value.password = password.value === '' ? 'Vui lòng nhập mật khẩu!' : ''
      // err.value.password_confirmation = password_confirmation.value === '' ? 'Vui lòng xác nhận mật khẩu!' : ''
      if (password_confirmation.value === '') {
        err.value.password_confirmation = 'Vui lòng xác nhận mật khẩu!'
      } else if (password.value !== password_confirmation.value) {
        err.value.password_confirmation = 'Mật khẩu xác nhận không khớp!'
      } else {
        err.value.password_confirmation = ''
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

      err.value.email = email.value === '' ? 'Vui lòng nhập email!' : ''
      err.value.password = password.value === '' ? 'Vui lòng nhập mật khẩu!' : ''

      if (err.value.email === '' && err.value.password === '') {
        try {
          await login(data)
        } catch (error) {
          err.value.email = 'Email hoặc mật khẩu không chính xác'
        }
      }
    }

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
      err,
      showPassword,
      variant,
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
  <h3 class="text-2xl font-bold text-center mb-4">{{ variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký' }}</h3>
  <form @submit.prevent="variant === 'LOGIN' ? handleSignIn() : handleSignUp()">
    <!-- Name input -->
    <UFormGroup v-slot="{ error }" class="mb-4" label="" :error="err.name">
      <div v-if="variant === 'REGISTER'" class="mb-4">
        <UInput
          v-model="name"
          type="text"
          placeholder="Họ tên"
          :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
          size="xl"
          help=""
        />
      </div>
    </UFormGroup>

    <!-- Email input -->
    <UFormGroup v-slot="{ error }" class="mb-4" label="" :error="err.email">
      <UInput
        v-model="email"
        type="email"
        placeholder="Email"
        :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
        size="xl"
        help=""
      />
    </UFormGroup>

    <!-- Password input -->
    <UFormGroup v-slot="{ err }" class="mb-4" label="" :error="err.password">
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

    <!-- Password Confirmation input -->
    <UFormGroup v-slot="{ error }" class="mb-4" label="" :error="err.password_confirmation">
      <div v-if="variant === 'REGISTER'" class="mb-4">
        <UInput
          v-model="password_confirmation"
          size="xl"
          :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
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
      </div>
    </UFormGroup>

    <!-- Remember me checkbox -->
    <div class="mb-4 flex items-center justify-between">
      <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <input
          id="exampleCheck3"
          class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
          type="checkbox"
          value=""
          checked
        />
        <label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="exampleCheck3"> Nhớ mật khẩu </label>
      </div>

      <!-- Forgot password link -->
      <a
        href="#!"
        class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
        >Quên mật khẩu?</a
      >
    </div>

    <!-- Submit button -->
    <UButton type="submit" class="w-full flex justify-center">
      {{ variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký' }}
    </UButton>

    <div>
      <p class="text-center mt-4 mb-0 text-sm text-neutral-600 dark:text-neutral-400">
        {{ variant === 'LOGIN' ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?' }}
        <nuxt-link
          :to="variant === 'LOGIN' ? '/auth/signup' : '/auth/signin'"
          class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
          >{{ variant === 'LOGIN' ? 'Đăng ký' : 'Đăng nhập' }}</nuxt-link
        >
      </p>
    </div>

    <!-- Divider -->
    <UDivider class="my-4" label="Hoặc" color="gray" />
    <!-- Social login buttons -->
    <div class="flex flex-col md:flex-row items-center gap-4">
      <auth-sign-in-with-google @click.prevent="signInWithGoogle" />
      <!--      <auth-sign-in-with-facebook @click.prevent="signInWithFacebook" />-->
    </div>
  </form>
</template>

<style>
.social-media-button {
  @apply w-full md:w-1/2 flex gap-2 justify-center items-center bg-transparent dark:bg-transparent border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-tertiary dark:text-tertiary-light focus:outline-none focus:ring-2 ring-primary hover:border-primary dark:hover:border-primary;
}
</style>
