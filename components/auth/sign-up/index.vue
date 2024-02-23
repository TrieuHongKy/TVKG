<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  title: 'Đăng ký',
  description: 'Đăng ký tài khoản'
  // middleware: 'guest'
})
</script>
<template>
  <section class="">
    <div class="g-4 flex h-full flex-wrap items-center justify-center">
      <!-- Left column container with background-->
      <div class="w-full md:w-1/2">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image"
        />
      </div>

      <!-- Right column container with form -->
      <div class="w-full md:w-1/2 p-4">
        <auth-form :form-variant="'REGISTER'"></auth-form>
      </div>
    </div>
  </section>
</template>

<style></style>
