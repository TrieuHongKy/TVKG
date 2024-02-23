<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div class="profile__section">
      <div class="flex justify-between mb-2">
        <div class="font-semibold text-lg">
          <div class="text-lg">Ngôn ngữ</div>
        </div>
        <div v-if="isOwnerProfile" class="profile__language--action">
          <UIcon
            name="i-heroicons-plus-circle"
            class="profile__language--icon"
            @click="openTemplate('addLanguage')"
          ></UIcon>
        </div>
      </div>
      <div v-if="languagesData.length > 0">
        <div v-for="(lang, index) in languagesData as Array<Language>" :key="index" class="flex gap-4">
          <div class="profile__language--content">
            <span class="text-base md:w-4/5"> {{ lang?.name }} : {{ lang?.slug }} </span>
            <div v-if="isOwnerProfile" class="profile__language--action w-1/5">
              <UIcon
                name="i-heroicons-pencil-square"
                class="profile__language--icon md:basis-[24px]"
                @click="openTemplate('editLanguage')"
              ></UIcon>
              <UIcon
                name="i-heroicons-trash"
                class="profile__language--icon md:basis-[24px]"
                @click="openTemplate('deleteLanguage')"
              ></UIcon>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isOwnerProfile && languagesData.length == 0" class="mt-4">
        <p class="text-gray-500">Bạn chưa thêm bất ngôn ngữ nào</p>
        <u class="profile__language--default" @click="openTemplate('addLanguage')">Thêm trình độ ngôn ngữ của bạn</u>
      </div>
      <div v-if="!isOwnerProfile && languagesData.length == 0" class="mt-4 text-gray-500">
        Tài khoản này chưa thêm vào bất cứ trình độ ngôn ngữ nào
      </div>
    </div>
    <UModal v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'addLanguage'">Thêm ngôn ngữ</p>
            <p v-if="nameModal === 'editLanguage'">Chỉnh sửa ngôn ngữ</p>
            <p v-if="nameModal === 'deleteLanguage'">Xóa ngôn ngữ</p>
          </div>
        </template>
        <UFormGroup>
          <div>
            <div v-if="nameModal === 'addLanguage'" class="flex flex-col gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="w-full md:w-1/2">
                  <label for="language" class="block mb-2 font-medium text-gray-900 dark:text-white">Ngôn Ngữ</label>
                  <USelect v-model="language" :options="languages" option-attribute="name" />
                </div>
                <!-- <div class="w-full md:w-1/2">
                  <label for="levels" class="block mb-2 font-medium text-gray-900 dark:text-white">Trình Độ</label>
                  <USelect v-model="showLang.level" :options="optionsLevel" option-attribute="option" />
                </div> -->
              </div>
              <!-- <i v-if="showLang.error.value !== ''" class="text-xs text-red-600">{{ showLang.error }}</i> -->
            </div>
            <div v-if="nameModal === 'editLanguage'" class="flex flex-col gap-4">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="w-full md:w-1/2">
                  <label for="language" class="block mb-2 font-medium text-gray-900 dark:text-white">Ngôn Ngữ</label>
                  <USelect v-model="language" :options="languages" disabled />
                </div>
                <!-- <div class="w-full md:w-1/2">
                  <label for="levels" class="block mb-2 font-medium text-gray-900 dark:text-white">Trình Độ</label>
                  <USelect v-model="showLang.level" :options="optionsLevel" />
                </div> -->
              </div>
            </div>
            <div v-if="nameModal === 'deleteLanguage'" class="flex flex-col gap-4">
              <div class="font-light">
                <p class="pb-2">
                  Thao tác này sẽ xóa
                  <span class="font-semibold">"Ngôn ngữ: Tiếng Anh"</span> ra khỏi tất cả hồ sơ của bạn.
                </p>
                <p>Bạn có chắc chắn muốn xóa ngôn ngữ này?</p>
              </div>
            </div>
          </div>
        </UFormGroup>
        <template #footer>
          <div class="flex gap-4 justify-end">
            <div class="CancelButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="solid"
                class="px-6"
                @click="cancelLanguage()"
                >Hủy</UButton
              >
            </div>
            <div v-if="nameModal === 'deleteLanguage'" class="DeletaButton">
              <UButton
                v-if="nameModal === 'deleteLanguage'"
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="openModal = false"
              >
                Xóa
              </UButton>
            </div>
            <div v-else class="SaveButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="nameModal === 'addLanguage' ? addLanguage() : ''"
                >Lưu</UButton
              >
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Language } from '~/types/language'

export default defineComponent({
  props: {
    languagesData: {
      type: Array,
      default: () => [] as Array<Language>
    },
    isOwnerProfile: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // const { showLang } = props
    const openModal = ref(false)
    const nameModal = ref('')

    const languageStore = useLanguageStore()
    const { languages } = storeToRefs(languageStore)
    const language = ref()

    onMounted(async () => {
      await languageStore.getLanguages()
    })

    const openTemplate = (modal: string) => {
      nameModal.value = modal
      openModal.value = true
    }

    const addLanguage = () => {
      openModal.value = false
    }

    const cancelLanguage = () => {
      openModal.value = false
    }
    return {
      language,
      languages,
      openModal,
      nameModal,
      openTemplate,
      addLanguage,
      cancelLanguage
    }
  }
})
</script>

<style scoped>
.profile__language--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__language--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__language--content {
  @apply flex items-center justify-between pb-2 w-full;
}
.profile__language--default {
  @apply text-sm text-green-600 font-medium hover:text-primary cursor-pointer;
}
</style>
