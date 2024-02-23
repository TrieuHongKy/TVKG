<template>
  <div class="flex justify-center">
    <div class="">
      <div v-if="!file" class="m-4">
        <label class="inline-block mb-2 text-gray-500">Tải lên hình ảnh</label>
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col w-full h-32 border-4 border-blue-200 hover:bg-theme-dark/90 border-dashed">
            <div class="flex flex-col items-center justify-center pt-7 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Chọn hình ảnh</p>
            </div>
            <input type="file" class="opacity-0" @change="uploadImage" />
          </label>
        </div>
      </div>
      <div v-else>
        <div class="w-36 h-36 rounded-full overflow-hidden mx-auto">
          <img class="w-full h-full object-cover" :src="file" alt="ảnh đại diện" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    file: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const uploadImage = (event: Event) => {
      const files = (event.target as HTMLInputElement).files
      if (files && files.length) {
        emit('update:modelValue', files[0])
      }
    }
    return {
      uploadImage
    }
  }
})
</script>

<style scoped></style>
