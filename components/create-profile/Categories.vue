<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const heading = ref({
      title: 'Chọn ra các lĩnh vực mà bạn làm việc !',
      text: 'Chọn ít nhất một lĩnh vực nghề nghiệp mô tả đúng nhất loại công việc bạn làm !',
      description:
        'Điều này giúp chúng tôi kết hợp bạn với những khách hàng cần kiến ​​thức chuyên môn độc đáo của bạn.'
    })
    // Edit kỹ năng
    const skills = [
      'Kinh tế và tài chính',
      'Y tế và chăm sóc sức khỏe',
      'Công nghệ thông tin',
      'Giáo dục và đào tạo',
      'Kỹ thuật và thiết kế',
      'Giao thông vận tải',
      'Nông nghiệp',
      'Đánh bắt thuỷ hải sản',
      'Lĩnh vực khác'
    ]
    // const showSkills = ref([])
    const selectedSkills = ref([])

    const removeSkill = (index: any) => {
      selectedSkills.value.splice(index, 1)
    }

    return {
      heading,
      skills,
      selectedSkills,
      removeSkill
    }
  }
})
</script>
<template>
  <section class="categories flex items-center justify-center p-4">
    <div class="container dark:bg-theme-dark">
      <div class="grid grid-cols-1 lg:grid-cols-12 flex-wrap">
        <div class="col-span-8 flex-col space-y-5">
          <span>8/10</span>
          <h2 class="font-medium md:text-xl leading-tight">{{ heading.title }}</h2>
          <p class="text-xs mt-5 lg:text-[16px] leading-tight">
            {{ heading.text }} <br />
            {{ heading.description }}
          </p>
          <p class="text-xs mt-5 lg:text-[16px] leading-tight"></p>
          <div class="flex flex-col w-full md:w-1/2 gap-4">
            <USelectMenu
              v-model="selectedSkills"
              :options="skills"
              multiple
              searchable
              placeholder="Chọn lĩnh vực của bạn"
              searchable-placeholder="Tìm kiếm ..."
            >
              <template #label>
                <span v-if="selectedSkills.length" class="truncate">{{ selectedSkills.join(', ') }}</span>
              </template></USelectMenu
            >
            <p class="text-sm leading-tight">Lĩnh vực bạn đã chọn:</p>
            <div class="">
              <p v-if="selectedSkills.length == 0" class="text-xs">Bạn chưa chọn lĩnh vực nào !</p>
              <div v-if="selectedSkills.length != 0" class="text-center flex flex-wrap gap-2">
                <div v-for="(sk, index) in selectedSkills" :key="index">
                  <UBadge color="primary" variant="solid" class="flex gap-1 text-sm hover:cursor-pointer"
                    >{{ sk }}
                    <UIcon class="hover:cursor-pointer" name="i-heroicons-x-mark" @click="removeSkill(index)"></UIcon
                  ></UBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
