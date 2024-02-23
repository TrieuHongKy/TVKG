<template>
  <div>
    <div class="profile__section">
      <div class="flex justify-between mb-2">
        <div class="font-semibold text-lg">
          <div class="text-lg">Kỹ năng</div>
        </div>
        <div v-if="isOwnerProfile" class="profile__skill--action">
          <UIcon
            name="i-heroicons-pencil-square"
            class="profile__skill--icon"
            @click="openTemplate('editSkill')"
          ></UIcon>
        </div>
      </div>
      <div v-if="currSkill.length > 0" class="profile__skill--content">
        <div v-for="(sk, index) in selectedSkills" :key="index">
          <UBadge color="primary" variant="solid" class="flex gap-1">{{ sk?.name }}</UBadge>
        </div>
      </div>
      <div v-if="currSkill.length <= 0 && isOwnerProfile" class="profile__skill--default">
        <p class="">Việc thêm kỹ năng làm việc có thể giúp bạn trông hoàn hảo hơn trong mắt nhà tuyển dụng</p>
        <u class="profile__skill--add" @click="openTemplate('editSkill')">Bổ sung các kinh nghiệm của bạn</u>
      </div>
      <div v-if="skills.length <= 0 && !isOwnerProfile" class="px-4 text-gray-500">
        Tài khoản này chưa thêm bất kỳ kỹ năng nào.
      </div>
    </div>
    <UModal v-if="isOwnerProfile" v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'editSkill'">Chỉnh sửa kỹ năng</p>
          </div>
        </template>
        <UFormGroup>
          <div>
            <div v-if="nameModal === 'editSkill'" class="flex flex-col gap-4">
              <p class="text-base">Kỹ năng của bạn</p>
              <div class="flex flex-col gap-4 p-4 border rounded-md">
                <div class="text-center flex flex-wrap gap-2">
                  <div v-for="(sk, index) in selectedSkills" :key="index">
                    <UBadge color="primary" variant="solid" class="flex gap-1"
                      >{{ sk?.name }}
                      <UIcon
                        class="hover:cursor-pointer text-base"
                        name="i-heroicons-x-mark"
                        @click="removeSkill(sk?.id)"
                      >
                      </UIcon>
                    </UBadge>
                  </div>
                </div>
                <USelectMenu
                  v-model="selectedSkills"
                  :options="skills"
                  searchable
                  placeholder="Hãy chọn kỹ năng của bạn"
                  searchable-placeholder="Tìm kiếm kỹ năng..."
                  multiple
                  option-attribute="name"
                >
                  <template #option="{ option: skill }">
                    <span class="truncate">{{ skill.name }}</span>
                  </template>
                  <template v-if="selectedSkills.length > 0" #label>
                    <span class="truncate">
                      <span v-for="s in selectedSkills" :key="s?.id">
                        {{ s?.name }}
                        <span v-if="s?.id !== selectedSkills[selectedSkills.length - 1]?.id">,</span>
                      </span>
                    </span>
                  </template>
                  <template #option-empty="{ query }">
                    <q>{{ query }}</q> không tồn tại
                  </template>
                </USelectMenu>
              </div>
              <div class="flex flex-col gap-4">
                <span class="text-sm">Bạn chỉ có thể chọn tối đa 10 kỹ năng</span>
                <div class="flex flex-col gap-4">
                  <p>Việc chọn kỹ năng rất quan trọng, nó giúp bạn:</p>
                  <ul class="text-sm flex flex-col gap-2">
                    <li>• Mô tả được điểm mạnh bản thân</li>
                    <li>• Làm nổi bật các kỹ năng cá nhân</li>
                    <li>• Chọn những kỹ năng bạn thực sự thuần thục</li>
                  </ul>
                </div>
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
                variant="outline"
                class="px-6"
                @click="cancelSkill()"
                >Hủy</UButton
              >
            </div>
            <div class="SaveButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="solid"
                class="px-6"
                @click="nameModal === 'editSkill' ? addSkills() : cancelSkill()"
              >
                {{ nameModal === 'editSkill' ? 'Lưu' : 'Hủy' }}
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Skill } from '~/types/skill'

export default defineComponent({
  props: {
    skillData: {
      type: Array as () => Array<Skill>,
      default: () => []
    },
    isOwnerProfile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-skills'],
  setup(props, { emit }) {
    const openModal = ref(false)
    const nameModal = ref('')
    const { skillData } = props
    const skillStore = useSkillStore()
    const { getSkills } = skillStore
    const { skills } = storeToRefs(skillStore)
    const selectedSkills = ref<Array<Skill>>([])
    const currSkill = ref<Array<Skill>>([])
    onMounted(async () => {
      await getSkills()
      currSkill.value = skillData
      selectedSkills.value = skillData
    })

    const openTemplate = (modal: string) => {
      nameModal.value = modal
      openModal.value = true
    }

    const addSkills = () => {
      currSkill.value = [...selectedSkills.value]
      openModal.value = false
      emit('update-skills', currSkill.value)
    }

    const cancelSkill = () => {
      selectedSkills.value = [...currSkill.value]
      openModal.value = false
    }
    const removeSkill = (id: number) => {
      const index = selectedSkills.value.findIndex((sk) => sk.id === id)
      currSkill.value = selectedSkills.value.splice(index, 1)
      emit('update-skills', currSkill.value)
    }

    return {
      skills,
      openModal,
      nameModal,
      openTemplate,
      selectedSkills,
      currSkill,
      addSkills,
      removeSkill,
      cancelSkill
    }
  }
})
</script>

<style scoped>
.profile__skill--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}

.profile__skill--action {
  @apply flex items-center justify-center font-bold gap-3;
}

.profile__skill--content {
  @apply text-center flex flex-wrap gap-2 p-2;
}

.profile__skill--default {
  @apply flex flex-col gap-2 px-4;
}

.profile__skill--add {
  @apply text-sm text-green-600 font-medium hover:text-primary cursor-pointer;
}
</style>
