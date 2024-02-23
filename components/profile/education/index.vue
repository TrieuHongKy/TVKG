<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div class="profile__section">
      <div class="profile__education--header">
        <div class="profile__education--heading">
          <span class="text-lg">Chương trình giáo dục</span>
        </div>
        <div v-if="isOwnerProfile" class="profile__education--add">
          <UIcon
            name="i-heroicons-plus-circle"
            class="profile__education--icon"
            @click="openTemplate(null, '')"
          ></UIcon>
        </div>
      </div>
      <div class="mt-4">
        <div v-for="edu in eduData" :key="edu.id" class="profile__education--content">
          <div class="flex items-center justify-between pb-1">
            <span class="profile__education--title">
              {{ edu.education_name }}
            </span>
            <div v-if="isOwnerProfile" class="profile__education--action">
              <UIcon
                name="i-heroicons-pencil-square"
                class="profile__education--icon md:basis-[24px]"
                @click="openTemplate(edu.id, 'UPDATE')"
              ></UIcon>
              <UIcon
                name="i-heroicons-trash"
                class="profile__education--icon md:basis-[24px]"
                @click="openTemplate(edu.id, 'DELETE')"
              ></UIcon>
            </div>
          </div>
          <p class="text-sm"><b>Chuyên ngành: </b>{{ edu.major }}</p>
          <p class="text-sm"><b>Ngày bắt đầu: </b>{{ edu.start_date }}</p>
          <p class="text-sm"><b>Ngày kết thúc: </b>{{ edu.end_date }}</p>
        </div>
      </div>
      <div v-if="!showedEducation && !isOwnerProfile">Không có học vấn nào để hiển thị.</div>
      <div v-if="!showedEducation && isOwnerProfile" class="mt-4">
        <p class="text-gray-500">Bạn chưa xác thực chương trình giáo dục nào</p>
        <u class="profile__education--default" @click="openTemplate(null, '')">Thêm chương trình giáo dục</u>
      </div>
      <div v-if="!showedEducation && isOwnerProfile" class="mt-4 text-gray-500">
        <p>Tài khoản này chưa cập nhật bất kỳ chương trình giáo dục nào</p>
      </div>
    </div>
    <UModal v-model="openModal" prevent-close>
      <form
        @submit.prevent="
          nameModal === 'addEducation'
            ? addEducation()
            : nameModal === 'editEducation'
              ? editEducation()
              : deleteEducation()
        "
      >
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center text-lg">
              <p v-if="nameModal === 'addEducation'">Thêm chương trình giáo dục</p>
              <p v-if="nameModal === 'editEducation'">Chỉnh sửa chương trình giáo dục</p>
              <p v-if="nameModal === 'deleteEducation'">Xóa chương trình giáo dục</p>
            </div>
          </template>
          <div>
            <div v-if="nameModal === 'deleteEducation'" class="flex flex-col gap-4">
              <div class="font-light">
                <p class="pb-2">
                  Thao tác này sẽ xóa
                  <span class="text-base font-semibold">"THPT Lưu Hữu Phước"</span> ra khỏi tất cả hồ sơ của bạn.
                </p>
                <p>Bạn có chắc chắn muốn xóa chương trình giao dục này?</p>
              </div>
            </div>
            <div v-else class="flex flex-col gap-4">
              <div class="grid gap-4">
                <div class="flex flex-col gap-2">
                  <label for="first_name">Trường học</label>
                  <UInput v-model="education_name" placeholder="Ví dụ: Cao đẳng FPT Polytechnic" size="lg" />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="first_name">Ngày tham gia</label>
                  <div class="grid gap-4 grid-cols-2">
                    <UInput v-model="start_date" type="date" required />
                    <UInput v-model="end_date" type="date" required />
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="company">Bằng cấp</label>
                  <UInput v-model="institution" placeholder="Ví dụ: Cằng cao đẳng chính quy" size="lg" />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="company">Chuyên Ngành</label>
                  <UInput v-model="major" placeholder="Ví dụ: Thiết Kế Website" size="lg" />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="company">Thành Phố</label>
                  <UInput v-model="city" placeholder="Ví dụ: Thiết Kế Website" size="lg" />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="company">Quốc Gia</label>
                  <UInput v-model="country" placeholder="Ví dụ: Thiết Kế Website" size="lg" />
                </div>
                <div class="flex flex-col gap-2">
                  <label for="company">Mô Tả</label>
                  <UTextarea
                    v-model="description"
                    size="lg"
                    placeholder="Ví dụ: Là học sinh tốt nghiệp xuất sắc trường cao đẳng FPT Polytechnic"
                  />
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <div class="flex gap-4 justify-end">
              <div class="CancelButton">
                <UButton
                  :ui="{ rounded: 'rounded-full' }"
                  size="lg"
                  color="primary"
                  variant="solid"
                  class="px-6"
                  @click="cancelModal()"
                  >Hủy</UButton
                >
              </div>
              <div class="DeletaButton">
                <UButton
                  type="submit"
                  :ui="{ rounded: 'rounded-full' }"
                  size="lg"
                  color="primary"
                  variant="outline"
                  class="px-6"
                >
                  {{ nameModal === 'deleteEducation' ? 'Xóa' : 'Lưu' }}
                </UButton>
              </div>
            </div>
          </template>
        </UCard>
      </form>
    </UModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { profilesData } from '~/apis/mock-data/profiles'
import type { Education } from '~/types/profile'
import { useEducationStore } from '~/stores/education'

export default defineComponent({
  props: {
    educations: {
      type: Object,
      default: null
    },
    isOwnerProfile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-education'],
  setup(props, { emit }) {
    const educationStore = useEducationStore()
    const { educations: educationData, education } = storeToRefs(educationStore)
    const { getEducationByCandidate, createEducation, updateEducation, getEducationById, removeEducation } =
      educationStore

    const educationId = ref<Number>(0)

    onMounted(async () => {
      await getEducationByCandidate(props.educations as Array<Education>)
    })
    // const { educations } = props

    const openModal = ref(false)
    const nameModal = ref('addEducation')
    const showEducation = ref(true)

    const education_name = ref('')
    const start_date = ref<any>()
    const end_date = ref<any>()
    const city = ref('')
    const country = ref('')
    const major = ref('')
    const institution = ref('')
    const description = ref('')

    const eduData = ref<Array<Education>>([])

    const { educations } = storeToRefs(educationStore)

    const showedEducation = computed(() => {
      if (educations.value.length > 0) {
        showEducation.value = false
        return educations.value
      }
    })

    onMounted(async () => {
      education_name.value = props.educations.name
      start_date.value = props.educations.start_date
      end_date.value = props.educations.end_date
      city.value = props.educations.city
      country.value = props.educations.country
      major.value = props.educations.major
      institution.value = props.educations.institution
      description.value = props.educations.description
      eduData.value = educations.value
    })

    const openTemplate = async (id: any, method: String) => {
      if (id && method === 'UPDATE') {
        nameModal.value = 'editEducation'
        await getEducationById(id)
        educationId.value = id
        education_name.value = education.value?.education_name || ''
        start_date.value = education.value?.start_date || ''
        end_date.value = education.value?.end_date || ''
        city.value = education.value?.city || ''
        country.value = education.value?.country || ''
        major.value = education.value?.major || ''
        institution.value = education.value?.institution || ''
        description.value = education.value?.description || ''
      }

      if (id && method === 'DELETE') {
        nameModal.value = 'deleteEducation'
        educationId.value = id
      }
      openModal.value = true
    }

    const addEducation = async () => {
      await createEducation({
        education_name: education_name.value,
        start_date: start_date.value,
        end_date: end_date.value,
        city: city.value,
        country: country.value,
        major: major.value,
        institution: institution.value,
        description: description.value
      } as Education)
      emit('update-education', educationData.value)
      openModal.value = false
    }

    const editEducation = async () => {
      await updateEducation(Number(educationId.value), {
        education_name: education_name.value,
        start_date: start_date.value,
        end_date: end_date.value,
        city: city.value,
        country: country.value,
        major: major.value,
        institution: institution.value,
        description: description.value
      } as any)
      openModal.value = false
    }

    const deleteEducation = async () => {
      await removeEducation(Number(educationId.value))
      emit('update-education', educationData.value)
      openModal.value = false
      nameModal.value = 'addEducation'
      education_name.value = ''
      start_date.value = ''
      end_date.value = ''
      city.value = ''
      country.value = ''
      major.value = ''
      institution.value = ''
      description.value = ''
    }

    const cancelModal = () => {
      openModal.value = false
    }

    const educationDateStart = ref(new Date())
    const educationDateEnd = ref(new Date())

    const eduLabelDateStart = computed(() =>
      educationDateStart.value.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    )

    const eduLabelDateEnd = computed(() =>
      educationDateEnd.value.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    )

    return {
      showedEducation,
      education_name,
      start_date,
      end_date,
      city,
      major,
      institution,
      description,
      country,
      //Thêm trình độ học vấn
      eduData,
      educationDateStart,
      educationDateEnd,
      eduLabelDateStart,
      eduLabelDateEnd,
      // education,
      profilesData,
      openModal,
      nameModal,
      openTemplate,
      cancelModal,
      addEducation,
      editEducation,
      educationId,
      deleteEducation
    }
  }
})
</script>

<style scoped>
.profile__education-add {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__education--header {
  @apply flex justify-between;
}
.profile__education--heading {
  @apply font-semibold text-lg;
}
.profile__education--icon {
  @apply w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer;
}
.profile__education--content {
  @apply mt-4 flex flex-col gap-1;
}
.profile__education--title {
  @apply font-semibold text-base md:basis-4/5;
}
.profile__education--action {
  @apply flex items-center justify-center font-bold gap-3;
}
.profile__education--default {
  @apply text-sm text-green-600 font-medium hover:text-primary cursor-pointer;
}
</style>
